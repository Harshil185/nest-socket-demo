import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

interface User {
  socketId: string;
  username: string;
}

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private users: Set<User> = new Set();
  private rooms: Set<string> = new Set();
  private roomUsers: Map<string, Set<User>> = new Map();

  constructor(private chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    let disconnectedUser: User | undefined;

    this.users.forEach((user) => {
      if (user.socketId === client.id) {
        disconnectedUser = user;
        this.users.delete(user);
      }
    });

    this.roomUsers.forEach((users, room) => {
      users.forEach((user) => {
        if (user.socketId === client.id) {
          users.delete(user);
        }
      });

      if (users.size === 0) {
        this.roomUsers.delete(room);
      }

      client.to(room).emit('user-left', {
        message: `${disconnectedUser?.username || 'A user'} left the chat.`,
      });
    });

    // if (disconnectedUser) {
    //   await this.chatService.removeUser(client.id);
    // }

    console.log(
      `Client disconnected: ${disconnectedUser?.username || client.id}`,
    );
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; username: string },
  ) {
    const { room, username } = data;

    // Fetch previous messages if the user exists
    const previousMessages = await this.chatService.getRoomMessages(
      room,
      username,
    );

    // Store user in memory
    const user: User = { socketId: client.id, username };
    this.users.add(user);

    this.rooms.add(room);
    if (!this.roomUsers.has(room)) {
      this.roomUsers.set(room, new Set());
    }
    this.roomUsers.get(room)?.add(user);

    await this.chatService.addUser(client.id, username);

    client.join(room);

    // Send previous messages to the user
    client.emit('previousMessages', previousMessages);

    this.server.to(room).emit('roomUpdate', {
      room,
      users: Array.from(this.roomUsers.get(room) || []),
    });

    client.to(room).emit('user-joined', {
      message: `${username} joined the chat.`,
    });

    console.log(`${username} joined room: ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    let leavingUser: User | undefined;

    if (this.roomUsers.has(room)) {
      this.roomUsers.get(room)?.forEach((user) => {
        if (user.socketId === client.id) {
          leavingUser = user;
          this.roomUsers.get(room)?.delete(user);
        }
      });

      if (this.roomUsers.get(room)?.size === 0) {
        this.roomUsers.delete(room);
        this.rooms.delete(room);
      }
    }

    client.leave(room);
    this.server.to(room).emit('roomUpdate', {
      room,
      users: Array.from(this.roomUsers.get(room) || []),
    });

    client.to(room).emit('user-left', {
      message: `${leavingUser?.username || 'A user'} left the chat.`,
    });

    console.log(`${leavingUser?.username || client.id} left room: ${room}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; message: string },
  ) {
    const roomUsers = this.roomUsers.get(data.room);
    const user = [...(roomUsers || [])].find((u) => u.socketId === client.id);

    if (!user) {
      client.emit('error', {
        message: `You are not in the room: ${data.room}`,
      });
      return;
    }

    await this.chatService.saveMessage(data.room, user.username, data.message);

    this.server.to(data.room).emit('newMessage', {
      sender: user.username,
      message: data.message,
    });

    console.log(
      `Message from ${user.username} in ${data.room}: ${data.message}`,
    );
  }
}
