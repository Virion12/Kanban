export type ListElementProps = {
  isDone: boolean;
  name: string;
  description: string;
  zone?: string;
  onToggle?: () => void; 
};
