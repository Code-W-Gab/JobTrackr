import { Award, Briefcase, Calendar, CircleX, Target, TrendingUp } from 'lucide-react';
import type { IApplication, statusType } from "../../types/applicationTypes";

export const getRecentApplications = (applications: IApplication[]) =>
  [...applications]
    .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime())
    .slice(0, 5);

export const getUpcomingInterviews = (applications: IApplication[]) =>
  [...applications]
    .filter((app) => app.status === "Interview" || app.status === "Final Interview")
    .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime())
    .slice(0, 3);

export const getRecentActivity = (applications: IApplication[]) =>
  [...applications]
    .sort((a, b) => {
      const aTime = new Date(a.updatedAt || a.dateApplied).getTime();
      const bTime = new Date(b.updatedAt || b.dateApplied).getTime();
      return bTime - aTime;
    })
    .slice(0, 4);

const currentYear = new Date().getFullYear();
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getMonthlyData = (applications: IApplication[]) => {
  return monthNames.map((month, index) => {
    const monthApplications = applications.filter((app) => {
      const appliedDate = new Date(app.dateApplied);

      return (
        !Number.isNaN(appliedDate.getTime()) &&
        appliedDate.getFullYear() === currentYear &&
        appliedDate.getMonth() === index
      );
    });

    const interviews = monthApplications.filter((app) =>
      app.status === 'Interview' || app.status === 'Final Interview'
    ).length;

    return {
      month,
      applications: monthApplications.length,
      interviews,
    };
  });
}

export const getMetricsData = (applications: IApplication[]) => {
  const statusValue: Record<string, number> = {
    totalApplications: applications.length,
    activeApplications: applications.filter(app => app.status === "Applied" || app.status === "Assessment").length,
    interviewsScheduled: applications.filter(app => app.status === "Interview" || app.status === "Final Interview").length,
    offerReceived: applications.filter(app => app.status === "Offer").length,
    rejected: applications.filter(app => app.status === "Rejected").length,
    accepted: applications.filter(app => app.status === "Accepted").length,
    wishlist: applications.filter(app => app.status === "Wishlist").length,
    successRate: applications.length > 0 ? Math.round((applications.filter(app => app.status === "Accepted").length / applications.length) * 100) : 0
  }

  const status: statusType[] = [
    {
      count: statusValue.totalApplications,
      name: "Total Applications",
      icon: Briefcase,
      color: "text-indigo-700",
      bgColor: "bg-indigo-100"
    },
    {
      count: statusValue.activeApplications,
      name: "Active Applications",
      icon: TrendingUp,
      color: "text-blue-700",
      bgColor: "bg-blue-100"
    },
    {
      count: statusValue.interviewsScheduled,
      name: "Interviews Scheduled",
      icon: Calendar,
      color: "text-orange-700",
      bgColor: "bg-orange-100"
    },
    {
      count: statusValue.offerReceived,
      name: "Offer Received",
      icon: Award,
      color: "text-green-700",
      bgColor: "bg-green-100"
    },
    {
      count: statusValue.rejected,
      name: "Rejected",
      icon: CircleX,
      color: "text-red-700",
      bgColor: "bg-red-100"
    },
    {
      count: `${statusValue.successRate}%`,
      name: "Success Rate",
      icon: Target,
      color: "text-violet-700",
      bgColor: "bg-violet-100"
    }
  ]

  const STATUS_DISTRIBUTION = [
    { name: 'Applied', value: statusValue.activeApplications, color: '#3B82F6' },
    { name: 'Interview', value: statusValue.interviewsScheduled, color: '#F59E0B' },
    { name: 'Offer', value: statusValue.offerReceived, color: '#10B981' },
    { name: 'Rejected', value: statusValue.rejected, color: '#EF4444' },
    { name: 'Accepted', value: statusValue.accepted, color: '#22C55E' },
    { name: 'Wishlist', value: statusValue.wishlist, color: '#94A3B8' },
  ];

  return { STATUS_DISTRIBUTION, status }
}