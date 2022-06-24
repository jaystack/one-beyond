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
    return this.drawService.getMessages();
  }

  @SubscribeMessage('getPlayers')
  getPlayers() {
    return this.drawService.getPlayers();
  }

  @SubscribeMessage('createMessage')
  createMessage(@MessageBody() message: Message) {
    this.drawService.createMessage(message);

    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('joinPlayer')
  joinPlayer(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
    this.drawService.joinPlayer(name, client.id);

    this.server.emit('join', { name });
  }

  @SubscribeMessage('startGame')
  startGame() {
    this.drawService.startGame();
    this.server.emit('started');
    setTimeout(() => {
      this.drawService.stopGame();
      this.server.emit('stopped');
    }, 80_000);
  }
}
