/**
 * FIX Message types
 * Define your domain models here
 */

export interface FixMessage {
  id?: string;
  messageType: string;
  sender: string;
  target: string;
  content: string;
  timestamp?: Date;
  status?: 'PENDING' | 'SENT' | 'FAILED';
}

export interface CreateFixMessageRequest {
  messageType: string;
  sender: string;
  target: string;
  content: string;
}
