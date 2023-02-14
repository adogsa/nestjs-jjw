import { HttpException, HttpStatus } from '@nestjs/common';

export class MyException extends HttpException {
  readonly name: string;
  readonly debugMsg?: any;

  constructor(args: { message: string; debugMsg?: any; status: HttpStatus }) {
    super(
      {
        message: args.message,
        debugMsg: args.debugMsg,
      },
      args.status,
    );
    this.debugMsg = args.debugMsg;
  }
}
