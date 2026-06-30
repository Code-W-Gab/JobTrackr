import { MapPin, Calendar } from "lucide-react";
import { useApplications } from "../../../hook/useApplication";

type statusType = {
  type: string;
  count: number;
};

export default function Kanban() {
  const { applications } = useApplications();

  const status: statusType[] = [
    { type: "Wishlist", count: applications.filter((app) => app.status === "Wishlist").length },
    { type: "Applied", count: applications.filter((app) => app.status === "Applied").length },
    { type: "Assessment", count: applications.filter((app) => app.status === "Assessment").length },
    { type: "Interview", count: applications.filter((app) => app.status === "Interview").length },
    { type: "Final Interview", count: applications.filter((app) => app.status === "Final Interview").length },
    { type: "Offer", count: applications.filter((app) => app.status === "Offer").length },
    { type: "Rejected", count: applications.filter((app) => app.status === "Rejected").length },
    { type: "Accepted", count: applications.filter((app) => app.status === "Accepted").length },
  ];

  const getApplicationsByStatus = (statusType: string) => {
    return applications.filter((app) => app.status === statusType);
  };

  return (
    <main className="flex h-full w-full flex-col border-l border-indigo-100 bg-[#f5f7f7] p-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-800">Kanban Board</h1>
        <p className="text-xs text-gray-500">Drag and drop to update application status</p>
      </div>

      <div className="mt-6 flex-1 overflow-hidden">
        <div className="flex h-full gap-4 overflow-x-auto">
          {status.map((item, index) => {
            const columnApplications = getApplicationsByStatus(item.type);

            return (
              <div
                key={index}
                className="flex h-full w-60 shrink-0 flex-col rounded-lg border border-t-4 border-t-indigo-500 border-gray-200 bg-white"
              >
                <div className="flex items-center justify-between border-b border-gray-200 p-3 text-xs font-semibold text-gray-700">
                  <h1>{item.type}</h1>
                  <p className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">
                    {item.count}
                  </p>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto bg-gray-100 p-2.5">
                  {columnApplications.length > 0 ? (
                    columnApplications.map((app) => (
                      <div
                        key={app._id}
                        className="space-y-3 rounded-lg border border-gray-200 bg-white p-2.5 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center gap-2">
                          <div className="rounded-lg bg-indigo-600 px-2 py-0.5 text-[13px] font-semibold text-white">
                            <p>{app.companyName.charAt(0).toUpperCase()}</p>
                          </div>
                          <span className="truncate text-sm font-semibold">
                            {app.companyName}
                          </span>
                        </div>

                        <p className="text-[11px] text-gray-500">{app.jobTitle}</p>

                        <div className="flex items-center justify-between gap-2 text-gray-500">
                          <div className="flex items-center gap-1 text-[11px]">
                            <MapPin size={14} />
                            <p className="truncate">{app.locationType}</p>
                          </div>

                          <div className="flex items-center gap-1 text-[11px]">
                            <Calendar size={14} />
                            <p>
                              {new Date(app.dateApplied).toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex h-32 items-center justify-center text-xs text-gray-400">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}