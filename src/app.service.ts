import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('APP_NAME') private readonly name: string) { }

  getHello(): string {
    return `Welcome to ${this.name}`;
  }
}
