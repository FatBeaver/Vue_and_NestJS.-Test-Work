import { Module } from '@nestjs/common';
import { AmoApiWorker } from './contact.service';
import { ContactController } from './contact.controller';
import { AuthService } from "../auth/auth.service";

@Module({
  providers: [AmoApiWorker, AuthService],
  controllers: [ContactController]
})
export class ContactModule {}
