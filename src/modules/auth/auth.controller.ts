import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    signIn(@Body() body: any) {
        try {
            return this.authService.login(body.email, body.password);
        } catch (error) {
            throw new Error(error);
        }
    }
}
