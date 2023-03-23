import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Attendee } from './attendee.entity';

@Entity('event')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    when: Date;

    @Column()
    address: string;

    @OneToMany(() => Attendee, (attendee) => attendee.event, {
        cascade: ['insert', 'update'],
    })
    attendees: Attendee[]

    // Virtual
    attendeeCount?: number
    attendeeRejected?: number
    attendeeMaybe?: number
    attendeeAccepted?: number
}