import type { FixTagEntry } from '../pages/build-fix';

export interface DisplayFixProps {
  entries: FixTagEntry[];
  beginString?: string;
  onRemove: (tag: string) => void;
  onUpdate: (tag: string, value: string) => void;
}
