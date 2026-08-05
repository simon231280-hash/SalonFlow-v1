import api from "../api/client";

export interface AppSettings {
  salon_name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  currency: string;
  tax_percent: number;
  receipt_footer: string | null;
}

export async function getSettings(): Promise<AppSettings> {
  const response = await api.get("/settings");
  return response.data;
}

export async function saveSettings(
  settings: AppSettings
): Promise<AppSettings> {
  const response = await api.put(
    "/settings",
    settings
  );

  return response.data;
}
