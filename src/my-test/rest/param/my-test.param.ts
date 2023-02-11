import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MyTestParam {
  @ApiProperty({ type: Number, description: 'columnNameParam', example: 168 })
  @IsNotEmpty()
  columnNameParam: number;

  // @ApiProperty({
  //   type: Number,
  //   description: `증명서 타입`,
  // })
  // @IsNotEmpty()
  // certType: CertTypeEnum;
  //
  // @ApiProperty({ type: Number, description: '시작일', example: 1688300000000 })
  // @IsNotEmpty()
  // startTime: number;
  //
  // @ApiProperty({ type: Number, description: '종료일', example: 1688310000000 })
  // @IsNotEmpty()
  // endTime: number;
  //
  // @ApiProperty({ type: Number, description: '병원코드', example: 2 })
  // @IsEmpty()
  // hospitalCode: number;
}
