import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MyTestService } from '../my-test.service';
import { MyTestResult } from './result/my-test.result';

@ApiTags('My')
@Controller('my-test')
export class MyTestController {
  constructor(
    private certInfoService1: MyTestService,
    private certInfoService: MyTestService,
  ) {}

  @Get('list/:columnName')
  @HttpCode(200)
  @ApiOperation({
    summary: '내 테스트들 조회',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '종류들 조회',
    isArray: true,
    type: MyTestResult,
  })
  async getCertTypeListByHospitalCode(
    @Param('columnName') columnName: number,
  ): Promise<{ myTestList: MyTestResult[] }> {
    return {
      myTestList: await this.certInfoService.findMyTypeList(columnName),
    };
  }
}
