import { RequestPayload } from './jwt-payload.interface';

export class JwtValidationResponse {
  constructor(readonly jwtPayload: RequestPayload) {}
}
