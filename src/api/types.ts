export type GPTStatus = 'pending' | 'approved' | 'rejected' | 'verified' | 'trending';

export interface GPTItem {
  id: string;
  name: string;
  description: string;
  category: string;
  status: GPTStatus;
  submitter: string;
  timestamp: string;
  badge?: 'verified' | 'trending' | 'rejected' | 'new';
  submissionHistory: {
    status: GPTStatus;
    timestamp: string;
  }[];
}

export interface FeedItem {
  name: string;
  description: string;
  category: string;
  url: string;
  badge: string;
  timestamp: string;
}
