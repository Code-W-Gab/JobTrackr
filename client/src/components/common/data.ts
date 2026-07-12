import { Award, Briefcase, Calendar, CircleX, Target, TrendingUp, MessageSquare } from 'lucide-react';
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
      color: "text-indigo-700 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-900"
    },
    {
      count: statusValue.activeApplications,
      name: "Active Applications",
      icon: TrendingUp,
      color: "text-blue-700 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      count: statusValue.interviewsScheduled,
      name: "Interviews Scheduled",
      icon: Calendar,
      color: "text-orange-700 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900"
    },
    {
      count: statusValue.offerReceived,
      name: "Offer Received",
      icon: Award,
      color: "text-green-700 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900"
    },
    {
      count: statusValue.rejected,
      name: "Rejected",
      icon: CircleX,
      color: "text-red-700 dark:text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900"
    },
    {
      count: `${statusValue.successRate}%`,
      name: "Success Rate",
      icon: Target,
      color: "text-violet-700 dark:text-violet-500",
      bgColor: "bg-violet-100 dark:bg-violet-900"
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

  return { STATUS_DISTRIBUTION, status, statusValue }
}

export const getResponseRateData = (applications: IApplication[]) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();

  return monthNames.map((month, index) => {
    const monthApplications = applications.filter((app) => {
      const appliedDate = new Date(app.dateApplied);

      return (
        !Number.isNaN(appliedDate.getTime()) &&
        appliedDate.getFullYear() === currentYear &&
        appliedDate.getMonth() === index
      );
    });

    const respondedApplications = monthApplications.filter((app) =>
      ['Interview', 'Final Interview', 'Offer', 'Rejected', 'Accepted'].includes(app.status)
    );

    const rate =
      monthApplications.length === 0
        ? 0
        : Math.round((respondedApplications.length / monthApplications.length) * 100);

    return { month, rate };
  });
};

export const getChartsData = (applications: IApplication[]) => {
  const platformData = [
    { platform: 'LinkedIn', count: applications.filter(app => app.platform === "LinkedIn").length },
    { platform: 'Indeed', count: applications.filter(app => app.platform === "Indeed").length },
    { platform: 'JobStreet', count: applications.filter(app => app.platform === "JobStreet").length },
    { platform: 'Glassdoor', count: applications.filter(app => app.platform === "Glassdoor").length },
    { platform: 'Company Website', count: applications.filter(app => app.platform === "Company Website").length }
  ];

  const conversationData = [
    { stage: 'Applied', count: applications.filter(app => app.status === "Applied").length, color: '#3B82F6' },
    { stage: 'Screened', count: applications.filter(app => app.status === "Assessment").length, color: '#6366F1' },
    { stage: 'Interview', count: applications.filter(app => app.status === "Interview").length, color: '#F59E0B' },
    { stage: 'Final', count: applications.filter(app => app.status === "Final Interview").length, color: '#F97316' },
    { stage: 'Offer', count: applications.filter(app => app.status === "Offer").length, color: '#10B981' },
    { stage: 'Accepted', count: applications.filter(app => app.status === "Accepted").length, color: '#22C55E' },
  ];

  const metrics = [
    { label: 'Applications Sent', value: applications.length, icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/50' },
    { label: 'Interviews', value: applications.filter(app => app.status === "Interview" || app.status === "Final Interview").length, icon: MessageSquare, color: 'text-amber-600 adr', bg: 'bg-amber-50 dark:bg-amber-900/50' },
    { label: 'Offers', value: applications.filter(app => app.status === "Offer").length, icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/50'},
    { label: 'Acceptance Rate', value: applications.length > 0 ? Math.round((applications.filter(app => app.status === "Accepted").length / applications.length) * 100) : 0, icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/50' },
  ];

  return { platformData, conversationData, metrics }
  
}