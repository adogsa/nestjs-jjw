import { EntityRepository } from '@mikro-orm/mysql';
import { User } from './user.entity';

export class UserRepository extends EntityRepository<User> {
  // public async findCertTypesByIdList(certIdList: number[]) {
  //   return await this.find({
  //     id: { $in: certIdList },
  //   });
  // }
}
