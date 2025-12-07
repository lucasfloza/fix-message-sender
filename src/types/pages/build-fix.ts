import type { FixTag } from '../data/fix-protocols';

export type FixMessageMap = Record<string, { msgType: string; tags: FixTag[] }>;

export type MarketOption = {
  id: string;
  label: string;
  description: string;
  beginString: string;
  disabled?: boolean;
  messages?: FixMessageMap;
};

export type MessageOption = {
  key: string;
  label: string;
  note?: string;
  msgType: string;
  tags: FixTag[];
};

export interface FixTagEntry {
  tag: string;
  value: string;
  name: string;
  description?: string;
  required?: boolean;
}
