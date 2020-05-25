import { Module } from '@nestjs/common';
import { AmoApiWorker } from './contact.service';
import { ContactController } from './contact.controller';


@Module({
  providers: [AmoApiWorker],
  controllers: [ContactController]
})
export class ContactModule {}
