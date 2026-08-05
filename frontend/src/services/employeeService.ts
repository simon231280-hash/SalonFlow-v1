import api from "../api/client";

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  email: string | null;
  position: string;
  salary: number;
  hire_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmployeeCreate {
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  email: string | null;
  position: string;
  salary: number;
  hire_date: string;
  is_active: boolean;
}

export interface EmployeeUpdate {
  first_name?: string;
  last_name?: string;
  gender?: string;
  phone?: string;
  email?: string;
  position?: string;
  salary?: number;
  hire_date?: string;
  is_active?: boolean;
}

export async function getEmployees(): Promise<Employee[]> {
  const response = await api.get("/employees");
  return response.data;
}

export async function createEmployee(
  employee: EmployeeCreate
): Promise<Employee> {
  const response = await api.post("/employees", employee);
  return response.data;
}

export async function updateEmployee(
  id: number,
  employee: EmployeeUpdate
): Promise<Employee> {
  const response = await api.put(`/employees/${id}`, employee);
  return response.data;
}

export async function deleteEmployee(
  id: number
): Promise<void> {
  await api.delete(`/employees/${id}`);
}
