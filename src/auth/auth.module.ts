import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from "./auth.controlerr";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.registerAsync({
        useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '60m'
            }
        })
    })],
    providers: [LocalStrategy, AuthService],
    controllers: [AuthController]
})
export class AuthModule { }