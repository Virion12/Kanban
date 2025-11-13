export type ListElementProps = {
  id: number;
  isDone: boolean;
  name: string;
  description: string;
  zone?: string;
  onToggle?: () => void; 
  onDelete?: () => void;
};
