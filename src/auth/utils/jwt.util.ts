import { MyJwtPayload } from '../model/jwt-payload.interface';

export class JwtUtil {
  static parse(token: string): MyJwtPayload {
    // 0 : header, 1: payload, 2: verity signature
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }
}
