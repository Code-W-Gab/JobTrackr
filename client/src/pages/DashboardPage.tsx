import Dashboard from '../components/ui/dashboard/Dashboard';
import DashboardLayout from '../layout/dashboard/DashboardLayout';

export default function DashboardPage() {
  return(
    <main>
      <DashboardLayout>
        <Dashboard/>
      </DashboardLayout>
    </main>
  )
}