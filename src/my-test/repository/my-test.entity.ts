import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { MyTestRepository } from './my-test.repository';

@Entity({
  customRepository: () => MyTestRepository,
  comment: 'jjw test entity',
  // tableName: 'my_test',
})
export class MyTest {
  @PrimaryKey()
  id: number;

  @Property({ type: Number, comment: 'columnName comment', default: 0 })
  columnName: number;

  @Property({ type: Number, comment: 'columnName comment2', default: 0 })
  columnName2: number;

  @Property({
    type: Number,
    comment: 'columnName comment3',
    default: 'default',
  })
  columnName3: string;

  @Property({ type: Number, comment: 'columnName comment4', default: 0 })
  columnName4: number;
}
