import { useEffect, useState } from "react";

import {
  getCustomers,
} from "../../services/customerService";

import {
  getEmployees,
} from "../../services/employeeService";

import {
  getServices,
} from "../../services/serviceService";


interface Appointment {

  id?: number;

  customer_id: number;

  employee_id: number;

  service_ids: number[];

  appointment_time: string;

  notes?: string;

}


interface Props {

  appointment?: Appointment | null;

  onSave: (
    appointment: Appointment
  ) => Promise<void>;

  onClose: () => void;

}


export default function AppointmentForm({
  appointment,
  onSave,
  onClose,
}: Props) {


  const [customers, setCustomers] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);


  const [customerId, setCustomerId] = useState(0);
  const [employeeId, setEmployeeId] = useState(0);
  const [serviceId, setServiceId] = useState(0);


  const [appointmentDate, setAppointmentDate] =
    useState("");

  const [appointmentClock, setAppointmentClock] =
    useState("");

  const [notes, setNotes] =
    useState("");



  useEffect(() => {

    loadData();

  }, []);



  async function loadData() {

    const customerData =
      await getCustomers();

    const employeeData =
      await getEmployees();

    const serviceData =
      await getServices();


    setCustomers(customerData);

    setEmployees(employeeData);

    setServices(serviceData);

  }



  useEffect(() => {


    if (!appointment) {


      const now = new Date();


      const year =
        now.getFullYear();


      const month =
        String(now.getMonth() + 1)
          .padStart(2, "0");


      const day =
        String(now.getDate())
          .padStart(2, "0");


      const hours =
        String(now.getHours())
          .padStart(2, "0");


      const minutes =
        String(now.getMinutes())
          .padStart(2, "0");



      setCustomerId(0);

      setEmployeeId(0);

      setServiceId(0);


      setAppointmentDate(
        `${year}-${month}-${day}`
      );


      setAppointmentClock(
        `${hours}:${minutes}`
      );


      setNotes("");

      return;

    }



    setCustomerId(
      appointment.customer_id
    );


    setEmployeeId(
      appointment.employee_id
    );


    setServiceId(
      appointment.service_ids?.[0] ?? 0
    );



    if (appointment.appointment_time) {


      const dt =
        appointment.appointment_time;


      setAppointmentDate(
        dt.substring(0, 10)
      );


      setAppointmentClock(
        dt.substring(11, 16)
      );

    }



    setNotes(
      appointment.notes ?? ""
    );



  }, [appointment]);





  async function submit(
    e: React.FormEvent
  ) {


    e.preventDefault();



    if (
      customerId === 0 ||
      employeeId === 0 ||
      serviceId === 0
    ) {

      alert(
        "Please select customer, employee and service"
      );

      return;

    }



    const appointmentTime =
      `${appointmentDate}T${appointmentClock}:00`;



    await onSave({


      id: appointment?.id,


      customer_id: customerId,


      employee_id: employeeId,


      service_ids: [
        serviceId
      ],


      appointment_time:
        appointmentTime,


      notes,


    });



  }





  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">


      <div className="bg-white rounded-xl p-8 w-[500px]">


        <h2 className="text-2xl font-bold mb-6">

          {
            appointment
              ? "Edit Appointment"
              : "Add Appointment"
          }

        </h2>



        <form
          onSubmit={submit}
          className="space-y-4"
        >



          <select

            className="w-full border rounded-lg p-3"

            value={customerId}

            onChange={(e) =>
              setCustomerId(
                Number(e.target.value)
              )
            }

          >

            <option value={0}>
              Select Customer
            </option>


            {
              customers.map((customer) => (

                <option
                  key={customer.id}
                  value={customer.id}
                >

                  {customer.first_name} {customer.last_name}

                </option>

              ))
            }


          </select>





          <select

            className="w-full border rounded-lg p-3"

            value={employeeId}

            onChange={(e) =>
              setEmployeeId(
                Number(e.target.value)
              )
            }

          >

            <option value={0}>
              Select Employee
            </option>


            {
              employees.map((employee) => (

                <option
                  key={employee.id}
                  value={employee.id}
                >

                  {employee.first_name} {employee.last_name}

                </option>

              ))
            }


          </select>





          <select

            className="w-full border rounded-lg p-3"

            value={serviceId}

            onChange={(e) =>
              setServiceId(
                Number(e.target.value)
              )
            }

          >

            <option value={0}>
              Select Service
            </option>


            {
              services.map((service) => (

                <option
                  key={service.id}
                  value={service.id}
                >

                  {service.name}

                </option>

              ))
            }


          </select>





          <input

            type="date"

            className="w-full border rounded-lg p-3"

            value={appointmentDate}

            onChange={(e) =>
              setAppointmentDate(
                e.target.value
              )
            }

            required

          />





          <input

            type="time"

            className="w-full border rounded-lg p-3"

            value={appointmentClock}

            onChange={(e) =>
              setAppointmentClock(
                e.target.value
              )
            }

            required

          />





          <textarea

            className="w-full border rounded-lg p-3"

            rows={3}

            placeholder="Notes"

            value={notes}

            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }

          />





          <div className="flex justify-end gap-3">


            <button

              type="button"

              onClick={onClose}

              className="border rounded-lg px-4 py-2"

            >

              Cancel

            </button>




            <button

              type="submit"

              className="bg-blue-600 text-white rounded-lg px-4 py-2"

            >

              Save

            </button>


          </div>



        </form>


      </div>


    </div>

  );

}
