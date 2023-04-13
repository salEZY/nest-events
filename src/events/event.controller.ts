import { Controller, Delete, Get, Patch, Post, Param, Body, HttpCode, ParseIntPipe, Logger, NotFoundException, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Event } from './event.entity'
import { CreateEventDto } from "./input/create-event.dto";
import { UpdateEventDto } from "./input/update-event.dto";
import { Like, MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Attendee } from "./attendee.entity";
import { EventsService } from "./event.service";
import { ListEvents } from "./input/list.events";

@Controller("/events")
export class EventsController {
    private readonly logger = new Logger(EventsController.name)
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>,
        @InjectRepository(Attendee)
        private readonly attendeeRepository: Repository<Attendee>,
        private readonly eventsService: EventsService
    ) { }
    private events: Event[] = []


    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    async findAll(@Query() filter: ListEvents) {
        this.logger.log(`Hit the findAll route`);
        let events: any
        try {
            events = await this.eventsService.getEventsPaginated(filter,
                {
                    total: true,
                    currentPage: filter.page,
                    limit: 2
                });
        } catch (err) {
            console.log(err)
        }


        this.logger.debug(`Found ${events.length} events`);
        return events;
    }

    // @Get('/practice')
    // async practice() {
    //     return await this.repository.find({
    //         select: ['id', 'when'],
    //         where: [{
    //             id: MoreThan(3),
    //             when: MoreThan(new Date('2021-02-12T13:00:00'))
    //         }, { description: Like('%meet%') }], take: 2, order: { id: 'ASC' }
    //     });
    // }

    @Get('practice2')
    async practice() {
        const event = await this.repository.findOne({ where: { id: 1 } })

        const attendee = new Attendee()
        attendee.name = 'Jerry'
        attendee.event = event

        await this.attendeeRepository.save(attendee)

        return event
    }


    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: number) {
        const event = await this.eventsService.getEvent(id);

        if (!event) {
            throw new NotFoundException('Event not found.')
        }

        return event

    }

    @Post()
    async create(@Body() input: CreateEventDto) {
        return await this.repository.save({ ...input, when: new Date(input.when) })

    }

    @Patch("/:id")
    async update(@Param("id", ParseIntPipe) id, @Body() input: UpdateEventDto) {
        let event = await this.repository.findOne(id)

        if (!event) throw new NotFoundException('Event not found.')

        return await this.repository.save({
            ...event, ...input, when: input.when ? new Date(input.when) : event.when
        })
    }

    @Delete("/:id")
    @HttpCode(204)
    async remove(@Param("id") id) {
        const result = await this.eventsService.deleteEvent(id)

        if (result?.affected !== 1) throw new NotFoundException('Event not found.')
    }
}