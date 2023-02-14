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

export class ErrSmsCheck extends MyException {
  readonly name = 'ErrSmsCheck';

  constructor(debugMsg?: any) {
    super({
      message: `sms 인증을 완료 하지 않았습니다.`,
      debugMsg: debugMsg,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}

export class ErrNotValidPassword extends MyException {
  readonly name = 'ErrNotValidPassword';

  constructor(debugMsg?: any) {
    super({
      message: `password가 틀렸습니다.`,
      debugMsg: debugMsg,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}

export class ErrUnauthorized extends MyException {
  readonly name = 'ErrUnauthorized';

  constructor(debugMsg?: any) {
    super({
      message: `해당 사용자의 인증 권한이 없습니다.`,
      debugMsg: debugMsg,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}

export class ErrValidToken extends MyException {
  readonly name = 'ErrValidToken';

  constructor(debugMsg?: any) {
    super({
      message: `해당 사용자의 token이 유효하지 않습니다.`,
      debugMsg: debugMsg,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
