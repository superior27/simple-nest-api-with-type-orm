import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET
  }),
    forwardRef(() => UsersModule),
    FileModule,
],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
