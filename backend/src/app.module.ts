import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [UsersModule, ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
