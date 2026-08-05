import api from "../api/client";

export interface Service {
  id: number;
  name: string;
  category: string;
  duration_minutes: number;
  price: number;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}


export interface ServiceCreate {
  name: string;
  category: string;
  duration_minutes: number;
  price: number;
  description?: string;
  is_active: boolean;
}

export interface ServiceUpdate {
  name?: string;
  category?: string;
  duration_minutes?: number;
  price?: number;
  description?: string;
  is_active?: boolean;
}

export async function getServices(): Promise<Service[]> {
  const response = await api.get("/services");
  return response.data;
}

export async function createService(
  service: ServiceCreate
): Promise<Service> {
  const response = await api.post("/services", service);
  return response.data;
}

export async function updateService(
  id: number,
  service: ServiceUpdate
): Promise<Service> {
  const response = await api.put(`/services/${id}`, service);
  return response.data;
}

export async function deleteService(
  id: number
): Promise<void> {
  await api.delete(`/services/${id}`);
}
