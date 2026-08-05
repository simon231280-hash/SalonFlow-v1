export interface Service {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  duration: number;
  created_at: string;
  updated_at: string;
}
