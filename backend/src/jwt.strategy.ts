// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-yaeu8k0rezjen3al.us.auth0.com/.well-known/jwks.json'
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'http://localhost:3000',
      issuerBaseURL: 'https://dev-yaeu8k0rezjen3al.us.auth0.com/',
      tokenSigningAlg: 'RS256'
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
