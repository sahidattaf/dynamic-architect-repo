import { GPTItem } from './types';
import fs from 'fs';
import path from 'path';

const FEED_PATH = path.join(process.cwd(), 'public', 'feed.json');

export const generateFeed = async (gpts: GPTItem[]) => {
  const approvedGpts = gpts.filter(gpt => gpt.status === 'approved');
  
  const feed = approvedGpts.map(gpt => ({
    name: gpt.name,
    description: gpt.description,
    category: gpt.category,
    url: `https://chat.openai.com/g/g-${gpt.id}`,
    badge: gpt.badge || 'new',
    timestamp: gpt.timestamp
  }));

  try {
    await fs.promises.writeFile(
      FEED_PATH,
      JSON.stringify(feed, null, 2),
      'utf8'
    );
    return true;
  } catch (error) {
    console.error('Error generating feed:', error);
    return false;
  }
};

export const getFeed = async () => {
  try {
    const data = await fs.promises.readFile(FEED_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading feed:', error);
    return [];
  }
};
