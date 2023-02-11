import { EntityRepository } from '@mikro-orm/mysql';
import { MyTest } from './my-test.entity';

export class MyTestRepository extends EntityRepository<MyTest> {
  // public async findCertTypesByIdList(certIdList: number[]) {
  //   return await this.find({
  //     id: { $in: certIdList },
  //   });
  // }
}
