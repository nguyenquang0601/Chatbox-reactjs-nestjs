import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenerateToken } from 'src/common/auth/token';

const users = [{
  id: 1,
  name: 'admin',
  password: '',
  room: ''
}];
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
    users.push({ id: input.id, name, room, password: '' })
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
    const userinRoom = users.filter(user => user.room === room)
    return userinRoom
  }
  async login(input) {
    const user = users.find(user => user.name === input.username)
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND)
    }
    const token = GenerateToken(user)
    return token
  }
}
