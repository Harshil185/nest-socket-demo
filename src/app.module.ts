import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './chat/schemas/user.schema';
import { Message, MessageSchema } from './chat/schemas/message.schema';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://harshil0518:harshil185@cluster0.ng7eftm.mongodb.net/chat'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, ChatService],
})
export class AppModule {}
