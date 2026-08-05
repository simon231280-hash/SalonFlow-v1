import LogoutButton from "../LogoutButton";

export default function TopBar() {
  return (
    <header className="flex justify-between items-center bg-white shadow px-8 py-4">

      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <span className="text-slate-600">
          Welcome
        </span>

        <LogoutButton />

      </div>

    </header>
  );
}
