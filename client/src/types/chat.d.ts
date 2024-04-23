interface IRecruiterChats {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: {
    content: string;
    sender: string;
    createdAt: string;
  };
  participants: {
    user: {
      id: string;
      email: string;
      username: string;
      profile: string;
    };
    company: string;
    recruiter: string;
  };
}

interface IUserChats {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: {
    content: string;
    sender: string;
    createdAt: string;
  };
  participants: {
    user: string;
    company: string;
    recruiter: {
      id: string;
      email: string;
      username: string;
      profile: string;
    };
  };
}

interface IMessage {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
  chatId: string;
}
