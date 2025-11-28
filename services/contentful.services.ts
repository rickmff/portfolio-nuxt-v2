import client from './client.config';
import { type EntryCollection, type ContentfulClientApi } from 'contentful';

class ContentfulService {
  private client;

  constructor(client: ContentfulClientApi<any>) {
    this.client = client;
  }

  public async getEntries(contentType: string): Promise<any> {
    try {
      const entries: EntryCollection<any> = await this.client.getEntries({
        content_type: contentType,
        include: 10 // Include linked assets and entries up to 10 levels deep
      });
      return entries.items.map(entry => entry.fields);
    } catch (error) {
      console.error(`Error fetching entries for content type ${contentType}:`, error);
      throw error;
    }
  }
}

export default new ContentfulService(client);
