export type LoaderSize = 'small' | 'medium' | 'large';

export interface LoaderProps {
  size?: LoaderSize;
  fullScreen?: boolean;
}
