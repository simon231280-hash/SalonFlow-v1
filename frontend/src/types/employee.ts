export interface Employee {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  role: string;
  salary?: number | null;
  created_at: string;
  updated_at: string;
}
