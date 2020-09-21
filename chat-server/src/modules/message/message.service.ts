import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import * as uuid from 'uuid'
import { messagesInRoom, users } from 'src/constants';
// import { async } from 'rxjs';
@Injectable()
export class MessageService {
  async saveMessage(idRoom, message, idUser) {
    let existsRoom = messagesInRoom.find(item => item.idRoom === idRoom)
    if (!existsRoom) {
      existsRoom = {
        id: uuid.v4(),
        idRoom,
        messages: []
      }
      messagesInRoom.push(existsRoom)
    }
    existsRoom.messages.push({
      idUser,
      text: message
    })
    // console.log(existsRoom.muessages)
  }
  async createMessagesInRoom(idRoom) {
    const newRoom = {
      id: uuid.v4(),
      idRoom,
      messages: []
    }
    messagesInRoom.push(newRoom)
  }
  async getMessageInRoom(idRoom) {
    // console.log(messagesInRoom)
    let existsRoom = messagesInRoom.find(item => item.idRoom === idRoom)
    const [hashUser] = await Promise.all<any>([
      new Promise(async resolve => {
        const hash = {}
        users.map(user => hash[user.id] = user)
        resolve(hash)
      })
    ])
    existsRoom.messages.forEach(mess => {
      mess.username = hashUser[mess.idUser].name
    })
    return existsRoom
  }
}
