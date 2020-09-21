import { Injectable, UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import * as uuid from 'uuid'
import { MessageService } from '../message/message.service';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { RoomService } from '../room/room.service';
import { rooms } from 'src/constants';

@UseGuards(AuthGuard)
@WebSocketGateway()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private userService: UserService,
    private mesService: MessageService,
    private roomService: RoomService
  ) { }
  @WebSocketServer() server: Server
  afterInit() {


  }
  handleConnection(client: Socket) {
    console.log('We have a new connection')
  }
  handleDisconnect(client: Socket) {
    // await this.roomService.removeUserInRoom()
    console.log('Use had left')
  }
  @SubscribeMessage('join')
  async handleJoinRoom(client: Socket, payload: any) {
    // console.log(payload)
    const room = await this.roomService.addUserToRoom({
      // id: client.id,
      ...payload
    })
    // console.log(room)
    client.join(room.id)
    const messagesInRoom = await this.mesService.getMessageInRoom(room.id)
    // console.log(messagesInRoom)
    this.server.to(room.id).emit('loadingMessages', messagesInRoom)
  }
  @SubscribeMessage('sendMessage')
  async sendMessage(client: Socket, payload: any) {
    console.log(payload)
    const userRoom: any = await this.roomService.getUserInRoom({ idRoom: payload.idRoom, idUser: payload.idUser })
    const mes = await this.mesService.saveMessage(payload.idRoom, payload.message, userRoom.idUser)
    const messagesInRoom = await this.mesService.getMessageInRoom(payload.idRoom)
    console.log(messagesInRoom)
    this.server.to(payload.idRoom).emit('message', messagesInRoom)
  }
}
