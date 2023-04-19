import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name)

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super()
    }

    public async validate(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { username } })
        if (!user) {
            this.logger.debug(`Username: ${username} not found.`)
            throw new UnauthorizedException()
        }

        if (password !== user.password) {
            this.logger.debug(`Passwords do not match.`)
            throw new UnauthorizedException()
        }

        return user
    }
}