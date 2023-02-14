import { JwtValidationResponse } from './jwt-validation.response';

export interface JwtValidatedRequest extends Request {
  user: JwtValidationResponse;
}
