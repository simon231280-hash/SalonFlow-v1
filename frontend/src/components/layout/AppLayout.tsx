import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: Props) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">

        <TopBar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
