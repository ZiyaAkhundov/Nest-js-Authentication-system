import { Module } from '@nestjs/common';
import { PasswordChangeService } from './password-change.service';
import { PasswordChangeResolver } from './password-change.resolver';

@Module({
  providers: [PasswordChangeResolver, PasswordChangeService],
})
export class PasswordChangeModule {}
