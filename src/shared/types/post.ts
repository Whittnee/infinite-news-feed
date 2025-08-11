export type TPost = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: number | { likes: number; dislikes?: number}
}