import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtValidatedRequest } from '../model/jwt-validated-request.interface';
import { AuthService } from '../auth.service';
import { JwtRefreshAuthGuard } from '../guard/jwt-refresh.strategy';
import { JwtSet } from '../model/jwt-set';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refreshToken')
  async refreshToken(@Req() req: JwtValidatedRequest): Promise<JwtSet> {
    return await this.authSvc.refreshToken(req.user.jwtPayload);
  }
}
