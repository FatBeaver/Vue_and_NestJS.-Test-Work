import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ContactModule, AuthModule]
})
export class AppModule {}
