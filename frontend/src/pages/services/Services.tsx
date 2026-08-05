import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AppLayout from "../../components/layout/AppLayout";
import ServiceTable from "../../components/services/ServiceTable";
import ServiceForm from "../../components/services/ServiceForm";

import type { Service } from "../../services/serviceService";

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../services/serviceService";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] =
    useState<Service | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSave(service: {
    id?: number;
    name: string;
    category: string;
    duration_minutes: number;
    price: number;
    description?: string;
    is_active: boolean;
  }) {
    try {
      if (service.id) {
        await updateService(service.id, service);
      } else {
        await createService({
          name: service.name,
          category: service.category,
          duration_minutes: service.duration_minutes,
          price: service.price,
          description: service.description,
          is_active: service.is_active,
        });
      }

      await loadServices();
      toast.success(
         service.id
           ? "Service updated successfully."
           : "Service added successfully."
      );
      setEditingService(null);
      setShowForm(false);

    } catch (error) {
      console.error(error);
      toast.error("Unable to save service.");
    }
  }

  async function handleDelete(service: Service) {

    const confirmed = window.confirm(
      `Delete "${service.name}"?`
    );

    if (!confirmed) return;

    try {

      await deleteService(service.id);

      await loadServices();
      toast.success("Service deleted successfully.");

    } catch (error) {

      console.error(error);

      toast.error("Unable to delete service.");

    }

  }

  function handleEdit(service: Service) {
    setEditingService(service);
    setShowForm(true);
  }

  function handleClose() {
    setEditingService(null);
    setShowForm(false);
  }

  return (
    <AppLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Services
        </h1>

        <button
          onClick={() => {
            setEditingService(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Service
        </button>

      </div>

      <ServiceTable
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <ServiceForm
          service={editingService}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}

    </AppLayout>
  );
}
