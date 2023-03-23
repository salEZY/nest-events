import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from './attendee.entity';
import { EventsController } from './event.controller';
import { Event } from './event.entity';
import { EventsService } from './event.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event, Attendee]),
    ],
    controllers: [EventsController],
    providers: [EventsService]
})
export class EventsModule { }
