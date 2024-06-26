export interface IChat {
  participants: {
    user: string;
    recruiter: string;
    company: string;
  };
  lastMessage?: string;
  messages?: Record<string, unknown>[];
}
