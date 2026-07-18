export default interface Post {
  id: number;
  author: {
    username: string;
    role: "user" | "artist";
  };
  content: string;
  post_type: "text" | "poll";
  poll_options: {
    votes: string[];
    options: string[];
  } | null;
  poll_votes?: number[] | null;
  authorId: number;
  is_pinned: boolean;
  like_count: number;
  comment_count: number;
  share_count: number;
  createdAt: string;
  updatedAt: string;
}
