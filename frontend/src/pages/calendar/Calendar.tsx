import { useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";

import {
  getDayCalendar,
} from "../../services/calendarService";

import type {
  CalendarAppointment,
} from "../../services/calendarService";


export default function Calendar() {


  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  const [date, setDate] =
    useState(today);


  const [appointments, setAppointments] =
    useState<CalendarAppointment[]>([]);



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



  return (

    <AppLayout>

      <div className="space-y-6">


        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            Appointment Calendar
          </h1>


          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="border rounded-lg p-2"
          />

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
                      className="border rounded-lg p-4"
                    >

                      <div className="font-bold text-lg">
                        {appointment.customer}
                      </div>


                      <div>
                        Employee:
                        {" "}
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


                      <div>
                        Status:
                        {" "}
                        {appointment.status}
                      </div>


                    </div>

                  ))

                }


              </div>

            )
          }


        </div>


      </div>


    </AppLayout>

  );

}
