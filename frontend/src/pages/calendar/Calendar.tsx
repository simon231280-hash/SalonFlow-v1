import AppLayout from "../../components/layout/AppLayout";

export default function Calendar() {
  return (
    <AppLayout>
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <h1 className="text-3xl font-bold">
            Appointment Calendar
          </h1>

        </div>

        <div className="bg-white rounded-xl shadow p-8">

          <div className="text-center text-gray-500">

            Calendar View

            <br />

            (Coming in Sprint 11)

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
