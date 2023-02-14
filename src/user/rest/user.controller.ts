import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { UserResult } from './result/user.result';
import { LoginParam, UserParam } from './param/loginParam';
import { JwtValidatedRequest } from '../../auth/model/jwt-validated-request.interface';
import { LocalAuthGuard } from '../../auth/guard/local.strategy';
import { JwtSet } from '../../auth/model/jwt-set';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.strategy';
import { User } from '../repository/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('join')
  @HttpCode(200)
  @ApiOperation({
    summary: '회원 가입',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '회원 가입 성공',
    type: JwtSet,
  })
  async join(@Body() param: UserParam): Promise<JwtSet> {
    return await this.userService.joinUser(param);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: '로그인',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '로그인 성공',
    type: UserResult,
  })
  async login(@Req() req: Request, @Body() param: LoginParam): Promise<JwtSet> {
    return await this.userService.login(param, req['user']);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({
    summary: '내정보 보기',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '내정보',
    type: UserResult,
  })
  @Get('me')
  getProfile(@Req() req: JwtValidatedRequest): UserResult {
    return UserResult.from(req.user.jwtPayload.user);
  }
}
