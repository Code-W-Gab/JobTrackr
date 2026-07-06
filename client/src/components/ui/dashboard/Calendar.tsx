import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date()); // June 2024

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month (0 = Sunday, 6 = Saturday)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Get number of days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get number of days from previous month to show
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Create array of calendar days
  const calendarDays = [];

  // Add previous month's days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i),
    });
  }

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(currentYear, currentMonth, i),
    });
  }

  // Add next month's days
  const remainingDays = 42 - calendarDays.length; // 6 rows × 7 days
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth + 1, i),
    });
  }

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
    setCurrentDate(
      new Date(currentYear, currentMonth - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentYear, currentMonth + 1, 1)
    );
  };

  return (
    <main className="h-full w-full p-6 bg-[#f5f7f7] border-l border-indigo-100">
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
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-yellow-500"></div>
            <p className="text-xs text-gray-500">Reminder</p>
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

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg p-4">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar dates */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((dayObj, index) => (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                transition-colors cursor-pointer
                ${
                  !dayObj.isCurrentMonth
                    ? "text-gray-300 bg-gray-50"
                    : "text-gray-800"
                }
                ${
                  isToday(dayObj.date)
                    ? "bg-indigo-500 text-white font-bold"
                    : dayObj.isCurrentMonth
                    ? "hover:bg-indigo-100"
                    : ""
                }
              `}
            >
              {dayObj.day}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}