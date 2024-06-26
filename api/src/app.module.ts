import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { ApiLoggerModule } from './api-logger/api-logger.module';
import { AuthStrategy } from './auth/auth.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '1h' }, // e.g. 30s, 7d, 24h
    }),
    UsersModule, 
    DatabaseModule, 
    ThrottlerModule.forRoot([{
      name: "short",
      ttl: 1000,
      limit: 3,
    },{
      name: "long",
      ttl: 60000,
      limit: 100,
    }]), ApiLoggerModule],
  controllers: [AppController],
  providers: [AppService, JwtService, AuthStrategy, {provide: APP_GUARD, useClass: ThrottlerGuard}],
})
export class AppModule {}
