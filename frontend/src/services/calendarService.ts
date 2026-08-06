import api from "../api/client";


export interface CalendarAppointment {
  id: number;
  customer: string;
  employee: string;
  services: string[];
  start: string;
  end: string;
  status: string;
}


export async function getDayCalendar(
  date: string
): Promise<CalendarAppointment[]> {

  const response = await api.get(
    "/calendar/day",
    {
      params: {
        target_date: date,
      },
    }
  );

  return response.data;
}
