import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../user/repository/user.entity';

export interface MyJwtPayload extends JwtPayload {
  jti: string;
  sub: string; // email
}

export interface RequestPayload extends MyJwtPayload {
  accessToken: string;
  refreshToken: string;
  user: User;
}
