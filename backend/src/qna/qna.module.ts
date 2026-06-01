import { Module } from '@nestjs/common';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';
import { GeminiModule } from '../gemini/gemini.module';

import { EmbeddingModule } from '../embedding/embedding.module';
import { DatabaseModule } from '../db/db.module';

@Module({
  controllers: [QnaController],
  providers: [QnaService],
  imports: [GeminiModule, EmbeddingModule, DatabaseModule],
})
export class QnaModule {}
