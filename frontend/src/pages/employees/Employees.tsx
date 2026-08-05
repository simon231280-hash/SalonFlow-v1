import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AppLayout from "../../components/layout/AppLayout";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeForm from "../../components/employees/EmployeeForm";

import type { Employee } from "../../services/employeeService";
import{
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/employeeService";

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSave(employee: {
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
  }) {
    try {
      if (employee.id) {
        await updateEmployee(employee.id, employee);
      } else {
        await createEmployee({
          first_name: employee.first_name,
          last_name: employee.last_name,
          gender: employee.gender,
          phone: employee.phone,
          email: employee.email || null,
          position: employee.position,
          salary: employee.salary,
          hire_date: employee.hire_date,
          is_active: employee.is_active,
        });
      }

      await loadEmployees();
      toast.success(
        employee.id
          ? "Employee updated successfully."
          : "Employee added successfully."
     );
      setEditingEmployee(null);
      setShowForm(false);

    } catch (error) {
      console.error(error);
      toast.error("Unable to save employee.");
    }
  }

  async function handleDelete(employee: Employee) {

    const confirmed = window.confirm(
      `Delete ${employee.first_name} ${employee.last_name}?`
    );

    if (!confirmed) return;

    try {

      await deleteEmployee(employee.id);

      await loadEmployees();
      toast.success("Employee deleted successfully.");

    } catch (error) {

      console.error(error);

      toast.error("Unable to delete employee.");

    }

  }

  function handleEdit(employee: Employee) {
    setEditingEmployee(employee);
    setShowForm(true);
  }

  function handleClose() {
    setEditingEmployee(null);
    setShowForm(false);
  }

  return (
    <AppLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Employees
        </h1>

        <button
          onClick={() => {
            setEditingEmployee(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Employee
        </button>

      </div>

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}

    </AppLayout>
  );
}
