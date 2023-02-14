import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtValidatedRequest } from '../model/jwt-validated-request.interface';
import { AuthService } from '../auth.service';
import { JwtRefreshAuthGuard } from '../guard/jwt-refresh.strategy';
import { JwtSet } from '../model/jwt-set';
import { SmsService } from '../sms/sms.service';
import { CheckSmsParam, SmsParam } from './param/authParam';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService, private smsSvc: SmsService) {}

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refreshToken')
  @ApiOperation({ summary: 'refresh token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'KDCA 접종내역',
    type: JwtSet,
  })
  async refreshToken(@Req() req: JwtValidatedRequest): Promise<JwtSet> {
    return await this.authSvc.refreshToken(req.user.jwtPayload);
  }

  @Post('sendSms')
  @ApiOperation({
    summary: 'sms 보내기(실제로는 안되고 구현만 되어 있는 상태)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '구현만 되어 있는 상태',
  })
  async sendSms(@Body() param: SmsParam): Promise<void> {
    await this.smsSvc.sendSMS(param.phoneNumber);
  }

  @Post('checkSms')
  @ApiOperation({
    summary: 'sms check (실제로는 안되고 구현만 되어 있는 상태)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '구현만 되어 있는 상태',
  })
  async checkSms(@Body() param: CheckSmsParam): Promise<boolean> {
    return await this.smsSvc.checkSms(param.phoneNumber, param.checkNumber);
  }
}
