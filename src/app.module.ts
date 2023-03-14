import { Module } from '@nestjs/common';
import { AppController } from './app.controller'
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';

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
    }),
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
