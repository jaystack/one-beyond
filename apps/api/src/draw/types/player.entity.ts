import { Role } from './role.type';

export class Player {
  order: number;
  name: string;
  score: number;
  role?: Role;
}
