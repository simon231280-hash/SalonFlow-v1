import type { Appointment } from "../../services/appointmentService";

import {
  updateAppointment,
} from "../../services/appointmentService";


interface Props {

  appointments: Appointment[];

  onEdit: (
    appointment: Appointment
  ) => void;

  onDelete: (
    appointment: Appointment
  ) => void;

  refresh: () => Promise<void>;

}



export default function AppointmentTable({

  appointments,

  onEdit,

  onDelete,

  refresh,

}: Props) {



  async function changeStatus(
    appointment: Appointment,
    status: string
  ) {


    try {


      await updateAppointment(

        appointment.id,

        {
          status,
        }

      );


      await refresh();


    } catch (error) {


      console.error(error);


      alert(
        "Unable to update status"
      );


    }


  }




  function statusStyle(
    status: string
  ) {


    switch(status) {


      case "confirmed":

        return "bg-blue-100 text-blue-700";


      case "completed":

        return "bg-green-100 text-green-700";


      case "cancelled":

        return "bg-red-100 text-red-700";


      default:

        return "bg-gray-100 text-gray-700";


    }


  }





  return (

    <table className="w-full bg-white rounded-xl shadow">


      <thead>


        <tr className="border-b">


          <th className="p-4 text-left">
            Customer
          </th>


          <th className="p-4 text-left">
            Employee
          </th>


          <th className="p-4 text-left">
            Services
          </th>


          <th className="p-4 text-left">
            Date & Time
          </th>


          <th className="p-4 text-left">
            Status
          </th>


          <th className="p-4 text-center">
            Actions
          </th>


        </tr>


      </thead>





      <tbody>


        {
          appointments.map(
            (appointment) => (


            <tr
              key={appointment.id}
              className="border-b"
            >


              <td className="p-4">

                {
                  appointment.customer.first_name
                }{" "}

                {
                  appointment.customer.last_name
                }

              </td>





              <td className="p-4">


                {
                  appointment.employee.first_name
                }{" "}

                {
                  appointment.employee.last_name
                }


              </td>





              <td className="p-4">


                {
                  appointment.appointment_services

                    .map(
                      (s) =>
                        s.service.name
                    )

                    .join(", ")
                }


              </td>





              <td className="p-4">


                {
                  new Date(
                    appointment.appointment_time
                  )
                  .toLocaleString()
                }


              </td>





              <td className="p-4">


                <select

                  value={appointment.status}

                  onChange={(e)=>
                    changeStatus(
                      appointment,
                      e.target.value
                    )
                  }

                  className={
                    `rounded-full px-3 py-1 text-sm font-semibold ${statusStyle(appointment.status)}`
                  }

                >

                  <option value="scheduled">
                    Scheduled
                  </option>


                  <option value="confirmed">
                    Confirmed
                  </option>


                  <option value="completed">
                    Completed
                  </option>


                  <option value="cancelled">
                    Cancelled
                  </option>


                </select>


              </td>





              <td className="p-4 flex justify-center gap-2">


                <button

                  onClick={() =>
                    onEdit(appointment)
                  }

                  className="rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"

                >

                  Edit

                </button>





                <button

                  onClick={() =>
                    onDelete(appointment)
                  }

                  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"

                >

                  Delete

                </button>


              </td>



            </tr>


          ))
        }


      </tbody>


    </table>

  );

}
