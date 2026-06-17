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
  
  return(
    <main className="grid grid-rows-[auto_1fr] h-screen w-screen overflow-hidden">
      {/* Top Row: Header Area */}
      <div className="flex items-center border-b border-indigo-100">
        <Brand />
        <Header setIsModalOpen={setIsModalOpen}/>
      </div>

      {/* Bottom Row: Content Area */}
      <div className="flex ">
        <Sidebar/>
        {children}
      </div>

      {isModalOpen && (
          <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
            <div className="z-50">
              <AddApplicationModal onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
    </main>

  )
}