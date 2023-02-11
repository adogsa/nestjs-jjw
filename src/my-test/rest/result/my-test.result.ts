import { ApiProperty } from '@nestjs/swagger';
import { MyTypeEnum } from '../../common/my-type-enum';
import { MyTest } from '../../repository/my-test.entity';

export class MyTestResult {
  @ApiProperty({ type: Number, description: 'column name' })
  columnName: number;

  @ApiProperty({ type: Number, description: '내 타입' })
  myType: MyTypeEnum;

  constructor(args: { columnName: number }) {
    this.columnName = args.columnName;
  }

  static from(entity: MyTest) {
    return new MyTestResult({ ...entity });
  }

  // static from(entity: MyTest) {
  //   return new MyTestResult({
  //     columnName: entity.columnName,
  //   });
  // }

  // static from(entity: MyTest) {
  //   return Object.assign(new MyTestResult(), _.omit(entity, 'sharedSecretKey'));
  // }

  //
  // @ApiProperty({ type: String, description: '증명서 서류 이름' })
  // certName: string;
  //
  // @ApiProperty({ type: Number, description: '병원코드' })
  // hospitalCode: number;
  //
  // @ApiProperty({ type: Number, description: '비용' })
  // price: number;
  //
  // @ApiProperty({
  //   type: Boolean,
  //   description:
  //     'oneToMany 는 한 개의 증명서가 여러 내용을 담을수 있는 문서라는 의미 (일종의 히스토리). ' +
  //     '입원 확인서의 경우 특정 기간동안 여러번 입/퇴원 했을 수 있으므로 ' +
  //     '한장에 입/퇴원 내역(aka history) 가 표현 됨을 의미',
  // })
  // oneToMany: boolean;
  //
  // @ApiProperty({
  //   type: String,
  //   description: '증명서 아이콘 Url (절대경로)',
  //   nullable: true,
  // })
  // logoUrl?: string;
  //
  // @ApiProperty({ type: ApiCertModel, description: '' })
  // certItems: ApiCertModel[];
}
