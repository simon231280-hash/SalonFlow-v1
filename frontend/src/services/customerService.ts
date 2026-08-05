import api from "../api/client";

export async function getCustomers() {
  const response = await api.get("/customers");
  return response.data;
}

export async function createCustomer(customer: {
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
}) {
  const response = await api.post(
    "/customers",
    customer
  );

  return response.data;
}

export async function updateCustomer(
  id: number,
  customer: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string | null;
  }
) {
  const response = await api.put(
    `/customers/${id}`,
    customer
  );

  return response.data;
}

export async function deleteCustomer(
  id: number
) {
  await api.delete(`/customers/${id}`);
}
