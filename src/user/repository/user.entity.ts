import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { UserRepository } from './user.repository';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity({
  customRepository: () => UserRepository,
  comment: 'jjw test entity',
  // tableName: 'my_test',
})
export class User {
  @PrimaryKey()
  id: number;

  @IsEmail()
  @Property({
    type: String,
    comment: 'columnName comment',
    default: 0,
    unique: true,
  })
  email: string;

  @IsNotEmpty()
  @Property({ type: String, comment: 'columnName comment2', default: 0 })
  password: string;

  @IsNotEmpty()
  @Property({ type: String, comment: 'columnName comment2', default: 0 })
  phone: string;

  @IsNotEmpty()
  @Property({ type: String, comment: 'columnName comment2', default: 0 })
  name: string;

  @Property({ type: String, comment: 'columnName comment2', default: 0 })
  hashedAccessToken: string;

  @Property({ type: String, comment: 'columnName comment2', default: 0 })
  hashedRefreshToken: string;
}
