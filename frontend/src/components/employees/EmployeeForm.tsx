import { useEffect, useState } from "react";
import type { Employee } from "../../services/employeeService";

interface Props {
  employee?: Employee | null;
  onSave: (employee: {
    id?: number;
    first_name: string;
    last_name: string;
    gender: string;
    phone: string;
    email?: string;
    position: string;
    salary: number;
    hire_date: string;
    is_active: boolean;
  }) => Promise<void>;
  onClose: () => void;
}

export default function EmployeeForm({
  employee,
  onSave,
  onClose,
}: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState<number | "">("");
  const [hireDate, setHireDate] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (employee) {
      setFirstName(employee.first_name);
      setLastName(employee.last_name);
      setGender(employee.gender);
      setPhone(employee.phone);
      setEmail(employee.email ?? "");
      setPosition(employee.position);
      setSalary(employee.salary);
      setHireDate(employee.hire_date);
      setIsActive(employee.is_active);
    }
  }, [employee]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    await onSave({
      id: employee?.id,
      first_name: firstName,
      last_name: lastName,
      gender,
      phone,
      email,
      position,
      salary: Number(salary),
      hire_date: hireDate,
      is_active: isActive,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={submit} className="space-y-4">

          <input
            className="w-full border rounded-lg p-3"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <select
            className="w-full border rounded-lg p-3"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Salary (MMK)
            </label>

            <input
              type="number"
              className="w-full border rounded-lg p-3"
              placeholder="Example: 500000"
              value={salary}
              onChange={(e) =>
                setSalary(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                )
              }
            />
          </div>

          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active Employee
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
