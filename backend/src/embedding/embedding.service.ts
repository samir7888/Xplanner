import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { DatabaseProvider } from 'src/db/db';

@Injectable()
export class EmbeddingService {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });
  // Split text into chunks
  splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  constructor(private databaseProvider: DatabaseProvider) {}

  async embedChunks(text: string) {
    const pool = this.databaseProvider.getPool();
    const docs = await this.splitter.createDocuments([text]);
    const vectors: number[][] = [];
    for (const doc of docs) {
      const response = await this.ai.models.embedContent({
        model: 'gemini-embedding-2',
        contents: text,
        config: {
          outputDimensionality: 768, // Forces the model to return 768 dimensions
        },
      });

      const vector = response.embeddings?.[0]?.values;
      // create a unique id for this file (basename without extension + timestamp)
      if (!vector || vector.length === 0) {
        console.error('Failed to get embedding for chunk:', doc.pageContent);
        return;
      }
      vectors.push(vector);
      await pool.query(
        `
      INSERT INTO documents
      (content, embedding)
      VALUES ($1, $2)
      `,
        [doc.pageContent, `[${vector?.join(',')}]`],
      );
    }
    return vectors;
  }

  async embedQuery(query: string) {
    const response = await this.ai.models.embedContent({
      model: 'gemini-embedding-2',
      contents: query,
      config: {
        outputDimensionality: 768, // Forces the model to return 768 dimensions
      },
    });

    const vector = response.embeddings?.[0]?.values;
    return vector;
  }
}
