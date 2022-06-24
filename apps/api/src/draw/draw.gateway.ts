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

  @SubscribeMessage('joinPlayer')
  joinPlayer(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
    Logger.debug('joinPlayer called');

    this.drawService.joinPlayer(name, client.id);

    this.server.emit('join', { name });
  }

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

    if (this.drawService.isGameRunning)
      message.win = this.drawService.answer === message.message;

    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('startGame')
  startGame(@ConnectedSocket() client: Socket) {
    const player = this.drawService.clientToPlayer[client.id];
    if (player.order !== 1) return;

    Logger.debug('startGame called ' + player.name);

    this.drawService.startGame();
    this.server.emit('started');

    setTimeout(() => {
      Logger.debug('endGame called');

      this.drawService.stopGame();
      this.server.emit('stopped');
    }, 80_000);

    return this.drawService.answer;
  }
  @SubscribeMessage('draw')
  draw(@MessageBody() payload: Point, @ConnectedSocket() client: Socket) {
    if (!this.drawService.isGameRunning) return;

    const player = this.drawService.clientToPlayer[client.id];

    Logger.debug('draw called' + player.name);
    client.broadcast.emit('draw', payload);
  }
}
