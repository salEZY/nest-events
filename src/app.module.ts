import { Module } from '@nestjs/common';
import { AppController } from './app.controller'
import { EventsController } from './event.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'

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
        synchronize: false
      })
    })
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule { }
