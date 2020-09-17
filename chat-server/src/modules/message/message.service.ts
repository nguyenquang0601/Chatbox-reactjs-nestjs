import { Injectable } from '@nestjs/common';

const messagesInRoom = []
@Injectable()
export class MessageService {
  async saveMessage(room, message, user) {
    let existsRoom = messagesInRoom.find(item => item.room === room)
    if (!existsRoom) {
      existsRoom = {
        room,
        messages: []
      }
      messagesInRoom.push(existsRoom)
    }
    existsRoom.messages.push({
      user,
      text: message
    })
    console.log(existsRoom.messages)
  }
  async getMessageInRoom(room) {
    let existsRoom = messagesInRoom.find(item => item.room === room)
    return existsRoom?.messages || []
  }
}
