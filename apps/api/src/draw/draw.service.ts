import { Injectable } from '@nestjs/common';

@Injectable()
export class DrawService {
  join(createDrawDto: string) {
    return 'This action adds a new draw';
  }
}
