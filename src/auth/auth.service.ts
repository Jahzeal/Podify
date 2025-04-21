import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private Prisma: PrismaService,
    private jwt: JwtService, // PrismaService is used to interact with the database
    private config: ConfigService, // ConfigService is used to access environment variables
  ) {}

  async signup(dto: AuthDto) {
    console.log('DATABASE_URL =', process.env.DATABASE_URL);
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.Prisma.user.create({
        data: {
          email: dto.email,
          hash,
          FirstName: dto.FirstName,
          LastName: dto.LastName,
          username: dto.username
        },
      });
      return this.signToken(user.id, user.email); // Return the created user
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials already exists',
          ); // Handle unique constraint violation
        }
      }
      console.log("error", error);
      throw new InternalServerErrorException(
        'An error occurred during signup',
      ); // Rethrow other errors
    }
  }

  async signin(dto: AuthDto) {
    console.log('DATABASE_URL =', process.env.DATABASE_URL);
    const user =
      await this.Prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    if (!user) {
      throw new ForbiddenException(
        'Credentials incorrect',
      ); // Handle user not found
    }
    const passwordMatches = await argon.verify(
      user.hash,
      dto.password,
    ); // Verify password
    if (!passwordMatches) {
      throw new ForbiddenException(
        'Credentials incorrect',
      ); // Handle password mismatch
    }
    return this.signToken(user.id, user.email); // Return user if credentials are correct
  }
  async resetPassword(dto: AuthDto) {
    const user = await this.Prisma.user.findUnique({
      where: {
        email: dto.email,
      },  
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    console.log("love"+dto.password);

    const hash = await argon.hash(dto.password);
    await this.Prisma.user.update({
      where: {
        email: dto.email,
      },
      data: {
        hash,
      },
    });
    
    const token = await this.signToken(user.id, user.email);
  
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        'changes': 'Password changed successfully',
      },
    };
  }
  

  async verifyEmail(dto: AuthDto) {
    const user = await this.Prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    }
    const token = await this.signToken(user.id, user.email);
    
    return {
      message:
        'Verification email sent successfully',
      access_token: token
    };
  }


  resendVerificationEmail(dto: AuthDto) {
    return {
      message:
        'Verification email resent successfully',
    };
  }


  async deleteAccount(dto: AuthDto) {
    const user = await this.Prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    }
    await this.Prisma.user.delete({
      where: {
        email: dto.email,
      },
    });
    return {
      message:
        'Account deleted successfully',
    };
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET'); // Get JWT secret from environment variables
    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );
    return { access_token: token }; // Return the signed JWT token
  }
}
// This method is used to sign the JWT token with the user ID and email
// and return the token. The token is signed with a secret key and has an expiration time of 15 minutes.
