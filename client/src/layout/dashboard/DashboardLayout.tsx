import Brand from "./Brand";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return(
    <main className="grid grid-rows-[auto_1fr] h-screen w-screen overflow-hidden">
      {/* Top Row: Header Area */}
      <div className="flex items-center border-b border-indigo-100">
        <Brand />
        <Header />
      </div>

      {/* Bottom Row: Content Area */}
      <div className="flex ">
        <Sidebar/>
        {children}
      </div>
    </main>

  )
}