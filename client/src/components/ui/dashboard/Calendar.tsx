import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useApplications } from "../../../hook/useApplication";
import type { IApplication } from "../../../types/applicationTypes";
import { formatDateForInput } from "../../../Utils/formatDate";

export default function Calendar() {
  const { applications } = useApplications();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedApplication, setSelectedApplication] = useState<IApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openApplicationModal = (app: IApplication) => {
    setSelectedApplication(app);
    setIsModalOpen(true);
  };

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const interviewApplications = applications.filter(
    (app) =>
      app.interviewDate &&
      (app.status === "Interview" || app.status === "Final Interview")
  );

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = useMemo(() => {
    const days: Array<{
      day: number;
      isCurrentMonth: boolean;
      date: Date;
    }> = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i),
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(currentYear, currentMonth, i),
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth + 1, i),
      });
    }

    return days;
  }, [currentMonth, currentYear, daysInMonth, daysInPrevMonth, firstDayOfMonth]);

  const normalizeDate = (value: string | Date) => {
    const date = new Date(value);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const getApplicationsForDate = (date: Date) => {
    return interviewApplications.filter((app) => {
      if (!app.interviewDate) return false;

      return (
        normalizeDate(app.interviewDate).getTime() ===
        normalizeDate(date).getTime()
      );
    });
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    <main className="h-full overflow-y-auto w-full p-6 bg-[#f5f7f7] border-l border-indigo-100">
      <header className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-xl text-gray-800">Calendar</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-indigo-500"></div>
            <p className="text-xs text-gray-500">Interview</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-red-500"></div>
            <p className="text-xs text-gray-500">Deadline</p>
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-300 cursor-pointer transition"
              aria-label="Previous month"
            >
              <ChevronLeft size={12} />
            </button>

            <h2 className="text-xs text-gray-800 font-bold w-24 text-center">
              {monthName}
            </h2>

            <button
              onClick={handleNextMonth}
              className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-300 cursor-pointer transition"
              aria-label="Next month"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-lg">
        <div className="grid grid-cols-7 gap-2 border border-b-0 border-gray-100 rounded-tl-lg rounded-tr-lg">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-600 py-4"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 border border-b-0 border-r-0 border-gray-100">
          {calendarDays.map((dayObj, index) => {
            const matchingApplications = getApplicationsForDate(dayObj.date);
            const isTodayInterview = matchingApplications.some((app) => {
              if (!app.interviewDate) return false;
              return (
                normalizeDate(app.interviewDate).getTime() ===
                normalizeDate(today).getTime()
              );
            });

            return (
              <div
                key={`${dayObj.date.toDateString()}-${index}`}
                className={`
                  relative border-b border-r border-gray-100 h-30 p-2 text-xs font-medium
                  transition-colors cursor-pointer
                  ${
                    isTodayInterview
                      ? "bg-indigo-50 text-red-700"
                      : isToday(dayObj.date)
                      ? "bg-indigo-50 text-indigo-700 font-bold"
                      : dayObj.isCurrentMonth
                      ? "text-gray-600 hover:bg-indigo-100"
                      : "text-gray-300 bg-gray-50"
                  }
                `}
              >
                <div
                  className={`absolute top-3 left-3 ${
                    isTodayInterview
                      ? "bg-indigo-500 size-8 flex items-center justify-center rounded-full text-white"
                      : isToday(dayObj.date)
                      ? "bg-indigo-500 size-8 flex items-center justify-center rounded-full text-white"
                      : ""
                  }`}
                >
                  {dayObj.day}
                </div>

                {matchingApplications.length > 0 && (
                  <div className="flex flex-col gap-1 mt-11">
                    {matchingApplications.slice(0, 2).map((app) => (
                      <div
                        onClick={() => openApplicationModal(app)}
                        key={app._id}
                        className={`rounded-sm p-1 text-[10px] truncate border-l ${
                          isTodayInterview
                            ? "bg-red-100 text-red-700 border-red-400"
                            : "bg-indigo-100 text-indigo-700 border-indigo-400"
                        }`}
                      >
                        Interview with {app.companyName}
                      </div>
                    ))}

                    {matchingApplications.length > 2 && (
                      <div className="text-[10px] text-indigo-500">
                        +{matchingApplications.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>


      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <div className="w-100 p-4 rounded-xl bg-white ">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-xl">{selectedApplication.status}</div>
                <button onClick={() => setIsModalOpen(false)} className="hover:bg-gray-100 p-2 rounded-full">
                  <X size={14} className="text-gray-500"/>
                </button>
              </div>
              <div>
                <span className="text-md font-semibold text-gray-900">Interview with {selectedApplication.companyName}</span>
                <div className="flex flex-col gap-1 text-gray-500 text-xs mt-2 ">
                  <span>Company: {selectedApplication.companyName}</span>
                  <span>Date: {formatDateForInput(selectedApplication.interviewDate ?? "")}</span>
                  <span>Time: {selectedApplication.interviewTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}