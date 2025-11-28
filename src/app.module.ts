import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './chat/schemas/user.schema';
import { Message, MessageSchema } from './chat/schemas/message.schema';
import { ChatService } from './chat/chat.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
require('dotenv').config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../'),
      serveRoot: '/',
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ng7eftm.mongodb.net/chat`),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, ChatService],
})
export class AppModule {}
