import { Module } from '@nestjs/common';
import { DatabaseProvider } from './db';

@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
