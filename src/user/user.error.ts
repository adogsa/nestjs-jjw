import { HttpStatus } from '@nestjs/common';
import { MyException } from '../utils/error/my.exception';

export class ErrUserNotCreated extends MyException {
  readonly name = 'ErrUserNotCreated';

  constructor(debugMsg?: any) {
    super({
      message: `사용자가 생성되지 못하였습니다.`,
      debugMsg: debugMsg,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

export class ErrUserNotUpdate extends MyException {
  readonly name = 'ErrUserNotUpdate';

  constructor(debugMsg?: any) {
    super({
      message: `사용자 정보를 수정하지 못하였습니다.`,
      debugMsg: debugMsg,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

export class ErrUserNotFound extends MyException {
  readonly name = 'ErrUserNotFound';

  constructor(message: string, debugMsg?: any) {
    super({
      message: `해당 이메일 사용자가 없습니다. :${message}`,
      debugMsg: debugMsg,
      status: HttpStatus.NOT_FOUND,
    });
  }
}

export class ErrUserAlreadyExists extends MyException {
  readonly name = 'ErrUserAlreadyExists';

  constructor(debugMsg?: any) {
    super({
      message: `이미 해당 이메일 사용자가 있습니다`,
      debugMsg: debugMsg,
      status: HttpStatus.NOT_FOUND,
    });
  }
}
