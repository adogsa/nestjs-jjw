import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MyTestRepository } from './repository/my-test.repository';
import * as _ from 'lodash';
import { DB1_NANE } from '../config/mikroorm.config';
import { MyTest } from './repository/my-test.entity';
import { MyTestResult } from './rest/result/my-test.result';

@Injectable()
export class MyTestService {
  constructor(
    @InjectRepository(MyTest, DB1_NANE)
    private readonly myTestRepository: MyTestRepository,
  ) {}

  async findMyTypeList(columnName: number): Promise<MyTestResult[]> {
    console.log(columnName);
    return _.map(
      await this.myTestRepository.findAll({
        cache: 1000 * 60 * 30, // 1시간 캐싱
      }),
      (myTest) => {
        return MyTestResult.from(myTest);
      },
    );
    // return await this.myTestRepository.findAll({
    //   cache: 1000 * 60 * 30, // 1시간 캐싱
    // });
    // return _.map(certTypes, (certType) => {
    //   return HospitalCertObj.from(certType);
    // });
  }
}
