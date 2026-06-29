import { useState } from "react";
import Brand from "./Brand";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AddApplicationModal from "../../components/overlays/AddApplicationModal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden bg-gray-50">
      {/* Top bar */}
      <div className="grid grid-cols-[190px_1fr] border-b border-indigo-100">
        <Brand />
        <Header setIsModalOpen={setIsModalOpen} />
      </div>

      {/* Main content area */}
      <div className="grid flex-1 min-h-0 grid-cols-[190px_1fr]">
        <aside className="bg-white">
          <Sidebar />
        </aside>

        <section className="min-h-0 overflow-y-auto bg-gray-50">
          <div className="h-full">{children}</div>
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-800/50">
          <div className="z-50">
            <AddApplicationModal onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}