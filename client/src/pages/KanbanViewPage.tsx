import Kanban from '../components/ui/dashboard/Kanban';
import DashboardLayout from '../layout/dashboard/DashboardLayout';

export default function KanbanViewPage() {
  return(
    <main>
      <DashboardLayout>
        <Kanban/>
      </DashboardLayout>
    </main>
  )
}