import { useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";

import AppointmentTable from "../../components/appointments/AppointmentTable";
import AppointmentForm from "../../components/appointments/AppointmentForm";

import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../../services/appointmentService";

import type {
  Appointment,
} from "../../services/appointmentService";

export default function Appointments() {

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [showForm, setShowForm] =
    useState(false);

  const [editingAppointment, setEditingAppointment] =
    useState<any>(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {

    try {

      const data =
        await getAppointments();

      setAppointments(data);

    } catch (error) {

      console.error(error);

    }

  }

  async function handleSave(data: any) {

    try {

      if (data.id) {

        await updateAppointment(
          data.id,
          {
            appointment_time:
              data.appointment_time,
            notes: data.notes,
          }
        );

      } else {

        await createAppointment({
          customer_id:
            data.customer_id,

          employee_id:
            data.employee_id,

          service_ids:
            data.service_ids,

          appointment_time:
            data.appointment_time,

          notes:
            data.notes,
        });

      }

      await loadAppointments();

      setEditingAppointment(null);

      setShowForm(false);

    } catch (error: any) {

      console.error(error);

      alert(
        error?.response?.data?.detail ??
	"Unable to save appointment.");

    }

  }

  async function handleDelete(
    appointment: Appointment
  ) {

    const confirmed = window.confirm(
      "Delete this appointment?"
    );

    if (!confirmed) return;

    try {

      await deleteAppointment(
        appointment.id
      );

      await loadAppointments();

    } catch (error) {

      console.error(error);

      alert(
        "Unable to delete appointment."
      );

    }

  }

  function handleEdit(
    appointment: Appointment
  ) {

    setEditingAppointment({

      id: appointment.id,

      customer_id:
        appointment.customer.id,

      employee_id:
        appointment.employee.id,

      service_ids:
        appointment.appointment_services.map(
          (s) => s.service.id
        ),

      appointment_time:
        appointment.appointment_time.slice(
          0,
          16
        ),

      notes:
        appointment.notes,

    });

    setShowForm(true);

  }

  function handleClose() {

    setEditingAppointment(null);

    setShowForm(false);

  }

  return (

    <AppLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Appointments
        </h1>

        <button
          onClick={() => {

            setEditingAppointment(null);

            setShowForm(true);

          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Appointment
        </button>

      </div>

      <AppointmentTable
        appointments={appointments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refresh={loadAppointments}
      />

      {showForm && (

        <AppointmentForm
          appointment={editingAppointment}
          onSave={handleSave}
          onClose={handleClose}
        />

      )}

    </AppLayout>

  );

}
