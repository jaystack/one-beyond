import { Module } from '@nestjs/common';
import { DrawService } from './draw.service';
import { DrawGateway } from './draw.gateway';

@Module({
  providers: [DrawGateway, DrawService]
})
export class DrawModule {}
