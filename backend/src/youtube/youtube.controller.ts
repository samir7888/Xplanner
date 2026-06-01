import { Body, Controller, Post } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeDto } from './dto/YoutubeDto';
import { EmbeddingService } from 'src/embedding/embedding.service';

@Controller('youtube')
export class YoutubeController {
  constructor(
    private youtubeService: YoutubeService,
    private embeddingService: EmbeddingService,
  ) {}
  @Post()
  async processVideo(@Body() { url }: YoutubeDto) {
    const text = await this.youtubeService.extractText(url);

    try {
      await this.embeddingService.embedChunks(text);
      return {
        message: 'YouTube processed and embeddings stored successfully',
      };
    } catch (error: any) {
      console.log(error);
      throw new Error('Failed to process YouTube video and store embeddings');
    }
  }
}
