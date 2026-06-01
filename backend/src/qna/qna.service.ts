import { Injectable } from '@nestjs/common';
import { EmbeddingService } from '../embedding/embedding.service';
import { GeminiService } from '../gemini/gemini.service';
import { DatabaseProvider } from 'src/db/db';

@Injectable()
export class QnaService {
  constructor(
    private readonly embeddingservice: EmbeddingService,
    private geminiService: GeminiService,
    private databaseProvider: DatabaseProvider,
  ) {}
  async askGemini(
    question: string,
    // type: 'pdf' | 'youtube',
  ): Promise<{ question: string; answer: string }> {
    // Placeholder implementation
    const pool = this.databaseProvider.getPool();
    const queryVector = await this.embeddingservice.embedQuery(question);

    if (!queryVector || queryVector.length === 0) {
      throw new Error('Failed to embed question');
    }
    const result = await pool.query(
      `
      SELECT content
      FROM documents
      ORDER BY embedding <=> $1
      LIMIT 5
      `,
      [`[${queryVector.join(',')}]`],
    );

    const prompt = `
Use ONLY the following text to answer:
Give answer in the language of the question that user gives.
for example, if user gives question in Hindi, answer in Hindi.
if nepali, answer in nepali.
${result.rows.map((row) => row.content).join('\n\n')}

Question: ${question}
`;
    const answer = await this.geminiService.ask(prompt);
    return {
      question,
      answer,
    };
  }
}
