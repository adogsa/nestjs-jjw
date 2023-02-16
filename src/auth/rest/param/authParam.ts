import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsNumberString } from 'class-validator';

export class SmsParam {
  @ApiProperty({ type: String, description: 'phone', example: '01099999999' })
  @IsNotEmpty()
  @IsMobilePhone()
  phoneNumber: string;
}

export class CheckSmsParam {
  @ApiProperty({ type: String, description: 'phone', example: '01099999999' })
  @IsNotEmpty()
  @IsMobilePhone()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    description: 'number string',
    example: '999999',
  })
  @IsNotEmpty()
  @IsNumberString()
  checkNumber: string;
}
