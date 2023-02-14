import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../repository/user.entity';

export class UserResult {
  @ApiProperty({ type: String, description: 'column name' })
  email: string;

  @ApiProperty({ type: String, description: 'column name' })
  name: string;

  @ApiProperty({ type: String, description: 'accessToken' })
  phone: string;

  constructor(args: { email: string; name: string; phone: string }) {
    this.email = args.email;
    this.name = args.name;
    this.phone = args.phone;
  }

  static from(entity: User) {
    return new UserResult({ ...entity });
  }
}
