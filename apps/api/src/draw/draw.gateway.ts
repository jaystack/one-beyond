import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { DrawService } from './draw.service';
import { Server, Socket } from 'socket.io';
import { Message } from './types/message.entity';
import { Logger } from '@nestjs/common';
import { Point } from './types/point.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DrawGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly drawService: DrawService) {}

  @SubscribeMessage('getMessages')
  getMessages() {
    Logger.debug('getMessages called');
    return this.drawService.getMessages();
  }

  @SubscribeMessage('getPlayers')
  getPlayers() {
    Logger.debug('getPlayers called');
    return this.drawService.getPlayers();
  }

  @SubscribeMessage('createMessage')
  createMessage(@MessageBody() message: Message) {
    Logger.debug('createMessage called');

    this.drawService.createMessage(message);

    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('joinPlayer')
  joinPlayer(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
    Logger.debug('joinPlayer called');

    this.drawService.joinPlayer(name, client.id);

    this.server.emit('join', { name });
  }

  @SubscribeMessage('startGame')
  startGame() {
    Logger.debug('startGame called');

    this.drawService.startGame();
    this.server.emit('started');

    setTimeout(() => {
      Logger.debug('endGame called');

      this.drawService.stopGame();
      this.server.emit('stopped');
    }, 80_000);
  }

  @SubscribeMessage('draw')
  draw(@MessageBody() payload: Point, @ConnectedSocket() client: Socket) {
    Logger.debug('draw called');
    client.broadcast.emit('draw', payload);
  }
}
