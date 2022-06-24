import { Injectable } from '@nestjs/common';
import { Message } from './types/message.entity';
import { Player } from './types/player.entity';

@Injectable()
export class DrawService {
  messages: Message[] = [{ name: 'joe', message: 'hello ' }];

  clientToPlayer: { [id: string]: Player } = {};

  isGameRunning = false;

  answer = 'ferrari';

  startGame() {
    this.isGameRunning = true;
  }

  stopGame() {
    this.isGameRunning = false;
  }

  getMessages() {
    return this.messages;
  }

  getPlayers() {
    return Object.keys(this.clientToPlayer).map(
      (clientId) => this.clientToPlayer[clientId]
    );
  }

  createMessage(message: Message) {
    this.messages.push(message);
  }

  joinPlayer(name: string, clientId: string) {
    this.clientToPlayer[clientId] = {
      name,
      score: 0,
      order:
        Math.max(0, ...this.getPlayers().map((player) => player.order)) + 1,
    };
  }
}
