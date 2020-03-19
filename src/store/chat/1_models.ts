export interface Message {
  user: string;
  text: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
}
