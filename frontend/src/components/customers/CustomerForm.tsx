import { useEffect, useState } from "react";

interface Customer {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

interface Props {
  customer?: Customer | null;

  onSave: (customer: Customer) => Promise<void>;

  onClose: () => void;
}

export default function CustomerForm({
  customer,
  onSave,
  onClose,
}: Props) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {

    if (customer) {

      setFirstName(customer.first_name);
      setLastName(customer.last_name);
      setPhone(customer.phone);
      setEmail(customer.email);

    }

  }, [customer]);

  async function submit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    await onSave({
      id: customer?.id,
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
    });

  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl p-8 w-96">

        <h2 className="text-2xl font-bold mb-6">

          {customer ? "Edit Customer" : "Add Customer"}

        </h2>

        <form
          onSubmit={submit}
          className="space-y-4"
        >

          <input
            className="w-full border rounded-lg p-3"
            placeholder="First Name"
            value={firstName}
            onChange={(e) =>
              setFirstName(e.target.value)
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) =>
              setLastName(e.target.value)
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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
