import { Injectable } from '@nestjs/common';
import { rooms, users } from 'src/constants';
import * as uuid from 'uuid'
import { MessageService } from '../message/message.service';
@Injectable()
export class RoomService {
  constructor(
    private messService: MessageService
  ) { }
  async getAllRooms() {
    return rooms
  }
  async addUserToRoom(input) {
    const roomExists = rooms.find(room => room.id === input.idRoom)
    if (roomExists) {
      const userExists = roomExists.usersInRoom.find(user => user.idUser === input.idUser)
      if (userExists) {
        return roomExists
      }
      // const newUser = 
      const userjoinroom = {
        id: uuid.v4(),
        idUser: input.idUser
      }
      roomExists.usersInRoom.push(userjoinroom)
      return roomExists
    }
    const userjoinroom = {
      id: uuid.v4(),
      idUser: input.idUser
    }
    const newRoom = {
      id: uuid.v4(),
      room: input.nameroom,
      usersInRoom: [userjoinroom]
    }
    await this.messService.createMessagesInRoom(newRoom.id)
    rooms.push(newRoom)
    return newRoom
    // const name = input?.name.trim().toLowerCase()
    // const room = input?.room.trim().toLowerCase()
    // const existsUser = users.find(user => user.room === room && user.name === name)
    // if (existsUser) {
    //   return existsUser
    //   throw new HttpException('Username is taken', HttpStatus.CONFLICT)
    // }
    // users.push({ id: input.id, name, room, password: '' })
    // return { id: input.id, name, room } 
  }
  async getUserInRoom({ idRoom, idUser }) {
    const roomExists = rooms.find(room => room.id === idRoom)
    // console.log(roomExists.usersInRoom)
    if (!roomExists) {
      return
    }
    const userJoinedRoom = roomExists.usersInRoom.find(ele => ele.idUser === idUser)
    // console.log(userJoinedRoom)

    return userJoinedRoom
  }
  async removeUserInRoom(idRoom, idClient) {
    const roomExists = rooms.find(room => room.id === idRoom)
    const newUsersInRoom = roomExists.usersInRoom.filter(id => id !== idClient)
    roomExists.usersInRoom = newUsersInRoom
  }
}
