import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './modules/chat/chat.module';
import { EventGateway } from './modules/gateway/event.gateway';
import { UserModule } from './modules/user/user.module';
import { MessageController } from './modules/message/message.controller';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [ChatModule, UserModule, MessageModule],
  controllers: [AppController, MessageController],
  providers: [AppService, EventGateway],
})
export class AppModule {}
