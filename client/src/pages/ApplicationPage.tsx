import Applications from '../components/ui/dashboard/Applications';
import DashboardLayout from '../layout/dashboard/DashboardLayout';

export default function ApplicationPage() {
  return(
    <main>
      <DashboardLayout>
        <Applications/>
      </DashboardLayout>
    </main>
  )
}