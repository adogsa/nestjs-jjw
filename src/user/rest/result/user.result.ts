import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../repository/user.entity';

export class UserResult {
  @ApiProperty({ type: Number, description: 'column name' })
  email: string;

  @ApiProperty({ type: Number, description: 'column name' })
  name: string;

  @ApiProperty({ type: Number, description: 'accessToken' })
  accessToken: string;

  @ApiProperty({ type: Number, description: 'accessToken' })
  phone: string;

  constructor(args: {
    email: string;
    name: string;
    accessToken: string;
    phone: string;
  }) {
    this.email = args.email;
    this.name = args.name;
    this.accessToken = args.accessToken;
    this.phone = args.phone;
  }

  static from(entity: User) {
    return new UserResult({ ...entity });
  }
}
