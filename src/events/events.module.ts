import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from './attendee.entity';
import { EventsController } from './event.controller';
import { Event } from './event.entity';
import { EventService } from './event.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event, Attendee]),
    ],
    controllers: [EventsController],
    providers: [EventService]
})
export class EventsModule { }
