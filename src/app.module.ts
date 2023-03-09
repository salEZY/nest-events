import { Module } from '@nestjs/common';
import { AppController } from './app.controller'
import { EventsController } from './event.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from './event.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'nest-events',
        synchronize: true,
        entities: [Event]
      })
    })
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule { }
