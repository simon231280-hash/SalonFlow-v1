import api from "../api/client";

export interface CustomerSummary {
  id: number;
  first_name: string;
  last_name: string;
}

export interface EmployeeSummary {
  id: number;
  first_name: string;
  last_name: string;
}

export interface ServiceSummary {
  id: number;
  name: string;
  price: number;
  duration_minutes: number;
}

export interface AppointmentService {
  id: number;
  price: number;
  duration_minutes: number;
  service: ServiceSummary;
}

export interface Appointment {
  id: number;

  customer: CustomerSummary;
  employee: EmployeeSummary;

  appointment_services: AppointmentService[];

  appointment_time: string;
  end_time: string;

  status: string;
  notes?: string;

  created_at: string;
  updated_at: string;
}

export interface AppointmentCreate {
  customer_id: number;
  employee_id: number;
  service_ids: number[];

  appointment_time: string;

  notes?: string;
}

export interface AppointmentUpdate {
  appointment_time?: string;
  status?: string;
  notes?: string;
}

export async function getAppointments(): Promise<Appointment[]> {
  const response = await api.get("/appointments");
  return response.data;
}

export async function createAppointment(
  appointment: AppointmentCreate
): Promise<Appointment> {
  const response = await api.post(
    "/appointments",
    appointment
  );

  return response.data;
}

export async function updateAppointment(
  id: number,
  appointment: AppointmentUpdate
): Promise<Appointment> {
  const response = await api.put(
    `/appointments/${id}`,
    appointment
  );

  return response.data;
}

export async function deleteAppointment(
  id: number
): Promise<void> {
  await api.delete(`/appointments/${id}`);
}
