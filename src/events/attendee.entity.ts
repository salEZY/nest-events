import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Event } from "./event.entity";

export enum AttendeeAnswer {
    Accepted = 1, Maybe, Rejected
}

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

    @Column('enum', {
        enum: AttendeeAnswer, default: AttendeeAnswer.Accepted
    })
    answer: AttendeeAnswer
}