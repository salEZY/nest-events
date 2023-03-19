import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity('attendee')
export class Attendee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Event, (event) => event.attendees, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn()
    event: Event
}