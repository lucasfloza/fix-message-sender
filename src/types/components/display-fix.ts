import type { FixTagEntry } from '../services/fixMessage';

export interface DisplayFixProps {
  entries: FixTagEntry[];
  beginString?: string;
  onRemove: (tag: string) => void;
  onUpdate: (tag: string, value: string) => void;
  onAddMessage?: (fixMessage: string, sohPayload: string) => void;
}
