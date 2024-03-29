import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Event } from "src/events/event.entity";
import { Attendee } from 'src/events/attendee.entity';

export default registerAs(
    'orm.config',
    (): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: false,
        entities: [Event, Attendee]
    }))