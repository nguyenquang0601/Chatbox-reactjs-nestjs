import { HttpException, HttpStatus, Injectable, ParseUUIDPipe } from '@nestjs/common';
import { GenerateToken } from 'src/common/auth/token';
import { hash, compare } from 'bcrypt';
import { users } from 'src/constants';
import * as uuid from 'uuid'
// import {} from '../..'
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
    const user = await users.find(user => user.name === input.username)
    if (!user) {
      throw new HttpException('Username or password incorrect', HttpStatus.NOT_FOUND)
    }
    const password1 = await hash(input.password, 10)
    console.log(password1)
    // return password1
    if (await this.comparePassword(input.password, user.password)) {
      const token = await GenerateToken(user)
      return token
    } else {

      throw new HttpException('Username or password incorrect', HttpStatus.NOT_FOUND)
    }
  }
  async register(input) {
    const existsUser = users.find(user => user.name === input.username)
    if (existsUser) {
      throw new HttpException('Usernamr is taken', HttpStatus.CONFLICT)
    }
    const newUser = {
      id: uuid.v4(),
      name: input.username,
      password: await hash(input.password, 10),
      room: []
    }
    users.push(newUser)
    return newUser
  }
  async comparePassword(password, hash) {
    return await compare(password, hash)
  }
  async loginGoogle(input) {
    const existsUser = users.find(user => user.name === input.username)
    if (existsUser) {
      const token = await GenerateToken(existsUser)
      return token
    }
    const newUser = {
      id: uuid.v4(),
      name: input.email,
      password: await hash('123445678', 10),
      room: []
    }
    users.push(newUser)
    const token = await GenerateToken(newUser)
    return token
  }
}
