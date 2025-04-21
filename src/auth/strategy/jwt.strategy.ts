import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    const secret = config.get('JWT_SECRET');
    console.log('Srcret', secret);
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        config.get('JWT_SECRET') ||
        process.env.JWT_SECRET ||
        'JWT_SECRET',
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
  }) {
    console.log('payload', payload);
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
    if (!user) {
      throw new UnauthorizedException(
        'User not found',
      );
    }
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
  }
}
