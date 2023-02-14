import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Property } from '@mikro-orm/core';

export class LoginParam {
  @ApiProperty({ type: String, description: 'email', example: 'xxx@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'password', example: 'fdsafds' })
  @IsNotEmpty()
  password: string;
}

export class UserParam {
  @ApiProperty({ type: String, description: 'email', example: 'xxx@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'password', example: 'fdsafds' })
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsMobilePhone()
  @Property({ type: String, comment: 'phone', default: 0 })
  phone: string;

  @IsNotEmpty()
  @Property({ type: String, comment: 'user name', default: 0 })
  name: string;
}
