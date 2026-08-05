import { useEffect, useState } from "react";

import type { Service } from "../../services/serviceService";

interface ServiceFormData {
  id?: number;
  name: string;
  category: string;
  duration_minutes: number;
  price: number;
  description?: string;
  is_active: boolean;
}

interface Props {
  service?: Service | null;
  onSave: (service: ServiceFormData) => Promise<void>;
  onClose: () => void;
}

export default function ServiceForm({
  service,
  onSave,
  onClose,
}: Props) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (service) {
      setName(service.name);
      setCategory(service.category);
      setDuration(service.duration_minutes);
      setPrice(service.price);
      setDescription(service.description ?? "");
      setIsActive(service.is_active);
    }
  }, [service]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    await onSave({
      ...(service?.id ? { id: service.id } : {}),
      name,
      category,
      duration_minutes: Number(duration),
      price: Number(price),
      description,
      is_active: isActive,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl p-8 w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          {service ? "Edit Service" : "Add Service"}
        </h2>

        <form
          onSubmit={submit}
          className="space-y-4"
        >

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            placeholder="Example: 30"
            value={duration}
            onChange={(e) =>
              setDuration(
                e.target.value === ""
                  ? ""
                  : Number(e.target.value)
              )      
           }
         />
       </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Price (MMK)
            </label>

            <input
              type="number"
              step="0.01"
              className="w-full border rounded-lg p-3"
              placeholder="Example: 15000"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                )
              }
            />
          </div>

          <textarea
            className="w-full border rounded-lg p-3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active Service
          </label>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="border rounded-lg px-4 py-2"
            >
              Cancel
            </button>

            <button
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
