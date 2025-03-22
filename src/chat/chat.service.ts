import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async addUser(socketId: string, username: string) {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      existingUser.socketId = socketId;
      await existingUser.save();
    } else {
      const newUser = new this.userModel({ socketId, username });
      await newUser.save();
    }
  }

  async removeUser(socketId: string) {
    await this.userModel.deleteOne({ socketId });
  }

  async saveMessage(room: string, sender: string, message: string) {
    const newMessage = new this.messageModel({ room, sender, message });
    return await newMessage.save();
  }

  async getRoomMessages(room: string, username: string) {
    const userExists = await this.userModel.findOne({ username });
  
    if (!userExists) {
      return []; // No previous messages if the user is new
    }
  
    return this.messageModel.find({ room }).sort({ createdAt: 1 }).exec();
  }
  
}
