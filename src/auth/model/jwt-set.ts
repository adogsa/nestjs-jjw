export class JwtSet {
  constructor(
    readonly tokenType: string,
    readonly accessToken: string,
    readonly accessTokenExpireTime: string,
    readonly refreshToken: string,
    readonly refreshTokenExpireTime: string,
  ) {}
}
