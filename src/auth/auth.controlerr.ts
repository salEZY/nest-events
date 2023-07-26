import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req) {
        console.log(req.user)
        return {
            userId: req.user.id,
            token: this.authService.getTokenForUser(req.user)
        }
    }
}