import { Controller, Delete, Get, Patch, Post, Param, Body, HttpCode, ParseIntPipe, ValidationPipe } from "@nestjs/common";
import { Event } from './event.entity'
import { CreateEventDto } from "./create-event.dto";
import { UpdateEventDto } from "./update-event.dto";
import { Like, MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Controller("/events")
export class EventsController {
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>) { }
    private events: Event[] = []


    @Get()
    async findAll() {
        return await this.repository.find();
    }

    @Get('/practice')
    async practice() {
        return await this.repository.find({
            select: ['id', 'when'],
            where: [{
                id: MoreThan(3),
                when: MoreThan(new Date('2021-02-12T13:00:00'))
            }, { description: Like('%meet%') }], take: 2, order: { id: 'ASC' }
        });
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: number) {
        console.log(typeof id)
        return this.repository.findOne({ where: { id: id } })

    }

    @Post()
    async create(@Body() input: CreateEventDto) {
        return await this.repository.save({ ...input, when: new Date(input.when) })

    }

    @Patch(":id")
    async update(@Param("id") id, @Body() input: UpdateEventDto) {
        let event = await this.repository.findOne(id)

        return await this.repository.save({
            ...event, ...input, when: input.when ? new Date(input.when) : event.when
        })
    }

    @Delete(":id")
    @HttpCode(204)
    async remove(@Param("id") id) {
        let event = await this.repository.findOne(id)
        await this.repository.remove(event)
    }
}