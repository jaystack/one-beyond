import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { DrawService } from './draw.service';

@WebSocketGateway()
export class DrawGateway {
  constructor(private readonly drawService: DrawService) {}

  @SubscribeMessage('join')
  join(@MessageBody() createDrawDto: string) {
    return this.drawService.join(createDrawDto);
  }
}
