import { Injectable } from '@nestjs/common';
import { Message } from './types/message.entity';
import { Player } from './types/player.entity';

@Injectable()
export class DrawService {
  messages: Message[] = [{ name: 'joe', message: 'hello ' }];
  players: Player[] = [{ name: 'joe', score: 0 }];

  clientToPlayer = {};

  getMessages() {
    return this.messages;
  }

  getPlayers() {
    return this.players;
  }

  createMessage(message: Message) {
    this.messages.push(message);
  }

  joinPlayer(name: string, clientId: string) {
    this.clientToPlayer[clientId] = name;
    this.players.push({ name, score: 0 });
  }
}
