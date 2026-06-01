import { Injectable } from '@nestjs/common';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { GeminiService } from '../gemini/gemini.service';

import { EmbeddingService } from 'src/embedding/embedding.service';

@Injectable()
export class PdfService {
  constructor(
    private geminiService: GeminiService,
    private embeddingService: EmbeddingService,
  ) {}

  async processPdf(filePath: string) {
    // 1. Load PDF
    const loader = new PDFLoader(filePath, {
      splitPages: false, // We will chunk manually
    });

    const rawdocs = await loader.load();
    const text = rawdocs.map((d) => d.pageContent).join('\n');

    try {
      await this.embeddingService.embedChunks(text);
      return {
        message: 'PDF processed and embeddings stored successfully',
      };
    } catch (error: any) {
      console.log(error);
      throw new Error('Failed to process PDF and store embeddings');
    }
  }
}
