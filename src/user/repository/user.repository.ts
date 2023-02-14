import { EntityRepository } from '@mikro-orm/mysql';
import { User } from './user.entity';

export class UserRepository extends EntityRepository<User> {
  public async getEm() {
    return this.em;
  }

  // public async findCertTypesByIdList(certIdList: number[]) {
  //   return await this.find({
  //     id: { $in: certIdList },
  //   });
  // }
}
