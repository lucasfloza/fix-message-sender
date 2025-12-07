export type FixValueOption = {
  value: string;
  label?: string;
  description?: string;
};

export type FixTag = {
  tag: string;
  name?: string;
  description?: string;
  required?: boolean;
  inputType?: 'number' | 'string' | 'datetime' | 'boolean';
  placeholder?: string;
  allowedValues?: FixValueOption[];
  group?: boolean;
  parent?: string;
  type: 'header' | 'body';
};
