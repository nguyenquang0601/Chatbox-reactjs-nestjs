import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

const users = [];
@Injectable()
export class UserService {
  async addUser(input) {
    const name = input?.name.trim().toLowerCase()
    const room = input?.room.trim().toLowerCase()
    const existsUser = users.find(user => user.room === room && user.name === name)
    if (existsUser) {
      return existsUser
      throw new HttpException('Username is taken', HttpStatus.CONFLICT)
    }
    users.push({ id: input.id, name, room })
    return { id: input.id, name, room }
  }
  async removeUser(id) {
    const index = users.findIndex(user => user.id === id)
    if (index > -1) {
      return users.splice(index, 1)
    }
  }
  async getUser(id) {
    const user = users.find(user => user.id === id)
    return user
  }
  async getUserInRoom(room) {
    const userinRoom = users.filter(user => user.room = --room)
    return userinRoom
  }
}
