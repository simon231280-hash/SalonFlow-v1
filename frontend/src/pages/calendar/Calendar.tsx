import { useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";

import {
  getDayCalendar,
} from "../../services/calendarService";

import type {
  CalendarAppointment,
} from "../../services/calendarService";
import AppointmentForm from "../../components/appointments/AppointmentForm";

import {
  getAppointment,
  updateAppointment,
} from "../../services/appointmentService";
export default function Calendar() {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const [date, setDate] =
    useState(today);

  const [appointments, setAppointments] =
    useState<CalendarAppointment[]>([]);
  const [showForm, setShowForm] =
    useState(false);

  const [editingAppointment, setEditingAppointment] =
    useState<any>(null);
  useEffect(() => {

    loadCalendar();

  }, [date]);

  async function loadCalendar() {

    try {

      const data =
        await getDayCalendar(date);

      setAppointments(data);

    } catch (error) {

      console.error(error);

    }

  }

  function changeDay(offset: number) {

    const current = new Date(date);

    current.setDate(
      current.getDate() + offset
    );

    setDate(
      current
        .toISOString()
        .split("T")[0]
    );

  }

  return (

    <AppLayout>

      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            Appointment Calendar
          </h1>

          <div className="flex items-center gap-3">

            <button
              onClick={() => changeDay(-1)}
              className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              ← Previous
            </button>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="border rounded-lg p-2"
            />

            <button
              onClick={() => changeDay(1)}
              className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Next →
            </button>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          {
            appointments.length === 0 ? (

              <p className="text-gray-500 text-center">
                No appointments found.
              </p>

            ) : (

              <div className="space-y-4">

                {
                  appointments.map(
                    (appointment) => (

                    <div
                      key={appointment.id}
                      onClick={async () => {

                        try {

                          const fullAppointment =
                            await getAppointment(
                              appointment.id
                            );

                          setEditingAppointment({

                            id: fullAppointment.id,

                            customer_id:
                              fullAppointment.customer.id,

                            employee_id:
                              fullAppointment.employee.id,

                            service_ids:
                              fullAppointment.appointment_services.map(
                                (s: any) => s.service.id
                              ),

                            appointment_time:
                              fullAppointment.appointment_time.slice(
                                0,
                                16
                              ),

                            notes:
                              fullAppointment.notes,

                          });

                          setShowForm(true);

                        } catch (error) {

                          console.error(error);

                          alert(
                            "Unable to load appointment."
                          );

                        }

                      }}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition"
                    >

                        <div className="font-bold text-lg">
                          {appointment.customer}
                        </div>

                      <div className="mt-2">
                        <div className="text-sm text-gray-500">
                           Services
                      </div>

                      <div className="flex flex-wrap gap-2 mt-1">
                        {appointment.services.map((service) => (
                          <span
                            key={service}
                            className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="font-semibold">
                        Employee:
                      </span>{" "}
                      {appointment.employee}
                    </div>

                        <div>
                          Time:
                          {" "}
                          {
                            new Date(
                              appointment.start
                            ).toLocaleTimeString()
                          }

                          {" - "}

                          {
                            new Date(
                              appointment.end
                            ).toLocaleTimeString()
                          }
                        </div>

                        <div className="mt-2">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              appointment.status === "scheduled"
                                ? "bg-green-100 text-green-700"
                                : appointment.status === "completed"
                                ? "bg-blue-100 text-blue-700"
                                : appointment.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)}
                          </span>
                        </div>

                      </div>

                    )
                  )
                }

              </div>

            )
          }

        </div>

      </div>

         {showForm && (

        <AppointmentForm
          appointment={editingAppointment}
          onSave={async (data: any) => {

            try {

              await updateAppointment(
                data.id,
                {
                  appointment_time:
                    data.appointment_time,

                  notes:
                    data.notes,
                }
              );

              setShowForm(false);

              setEditingAppointment(null);

              await loadCalendar();

            } catch (error) {

              console.error(error);

              alert(
                "Unable to update appointment."
              );

            }

          }}
          onClose={() => {

            setShowForm(false);

            setEditingAppointment(null);

          }}
        />

      )}

    </AppLayout>

  );

}
