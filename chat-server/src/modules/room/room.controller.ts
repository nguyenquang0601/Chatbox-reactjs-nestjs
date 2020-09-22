import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) { }
  @Get('')
  async getAllRoom() {
    return this.roomService.getAllRooms()
  }
}
