import { Controller, Delete, Get, Patch, Post, Param, Body, HttpCode } from "@nestjs/common";
import { Event } from './event.entity'
import { CreateEventDto } from "./create-event.dto";
import { UpdateEventDto } from "./update-event.dto";
import { Repository } from "typeorm";
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

    @Get(":id")
    async findOne(@Param("id") id) {
        return this.repository.findOne(id)

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