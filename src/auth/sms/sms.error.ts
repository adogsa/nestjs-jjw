import { HttpStatus } from '@nestjs/common';
import { MyException } from '../../utils/error/my.exception';

export class ErrSmsThirdParty extends MyException {
  readonly name = 'ErrSmsThirdParty';

  constructor(debugMsg?: any) {
    super({
      message: `sms 송신중 에러 발생하였습니다.`,
      debugMsg: debugMsg,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
