export interface User {
  id: string;
  email?: string;
  phone?: string | null;
  handle?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
  birthday?: string | null;
  created_at?: string;
}
