import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import * as uuid from 'uuid'
import { MessageService } from '../message/message.service';

@WebSocketGateway()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private userService: UserService,
    private mesService: MessageService
  ) { }
  @WebSocketServer() server: Server
  afterInit() {

  }
  handleConnection(client: Socket) {
    console.log('We have a new connection')
  }
  async handleDisconnect(client: Socket) {
    await this.userService.removeUser(client.id)
    console.log('Use had left')
  }
  @SubscribeMessage('join')
  async handleJoinRoom(client: Socket, payload: any) {
    const user = await this.userService.addUser({
      id: client.id,
      ...payload
    })
    client.join(user.room)
    // client.emit('message', {
    //   user: 'admin',
    //   text: `${user.name}, welcome to the room ${user.room}`
    // })
    // client.broadcast.to(user.room).emit('message', {
    //   user: 'admin',
    //   text: `${user.name} has joined`
    // })
    // await this.mesService.saveMessage(user.room, `${user.name} has joined`, 'admin')
    const messagesInRoom = await this.mesService.getMessageInRoom(user.room)
    console.log(messagesInRoom)
    this.server.to(user.room).emit('loadingMessages', messagesInRoom)
  }
  @SubscribeMessage('sendMessage')
  async sendMessage(client: Socket, payload: any) {
    const user: any = await this.userService.getUser(client.id)
    const mes = await this.mesService.saveMessage(user.room, payload, user.name)
    this.server.to(user.room).emit('message', {
      user: user.name,
      text: payload
    })
  }
}
