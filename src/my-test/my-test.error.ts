import { HttpStatus } from '@nestjs/common';
import { MyException } from '../utils/error/my.exception';

export class ErrMyTest extends MyException {
  readonly name = 'ErrMyTest';

  constructor(message: string, debugMsg?: any) {
    super({
      message: `${message}`,
      debugMsg: debugMsg,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

export class ErrMyTestNotFound extends MyException {
  readonly name = 'ErrMyTestNotFound';

  constructor(message: string, debugMsg?: any) {
    super({
      message: `내 테스트 없습니다. ${message}`,
      debugMsg: debugMsg,
      status: HttpStatus.NOT_FOUND,
    });
  }
}
