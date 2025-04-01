"use client";
import { useState } from "react";
import { useProject } from "@/contexts/project-context";
import cns from "classnames";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Get days in month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Get first day of month (0 = Sunday, 1 = Monday, etc.)
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const ContentCalendar = () => {
  const { currentProject } = useProject();
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  // Create calendar days array
  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ day: 0, inMonth: false });
  }

  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, inMonth: true });
  }

  // Get tasks for each day
  const getTasksForDay = (day: number) => {
    if (day === 0) return [];

    const date = new Date(currentYear, currentMonth, day);

    return currentProject.tasks.filter((task) => {
      if (!task.dueDate) return false;

      const dueDate = new Date(task.dueDate);
      return (
        dueDate.getDate() === day &&
        dueDate.getMonth() === currentMonth &&
        dueDate.getFullYear() === currentYear
      );
    });
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      className={cns(
        "w-full h-full max-w-[1400px] mx-auto px-6 animate-fade-in ",
      )}
    >
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-semibold mb-4 sm:mb-0 pl-4 text-neutral-500">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FaChevronLeft size={20} color={"#525252"}/>
          </button>

          <button
            onClick={goToToday}
            className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-sm font-medium"
          >
            Today
          </button>

          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FaChevronRight size={20} color={"#525252"}/>
          </button>
        </div>
      </div>
      <div className="rounded-2xl p-4 overflow-hidden">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center py-2 text-sm font-medium text-neutral-700"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((dayObj, index) => {
            const dayTasks = getTasksForDay(dayObj.day);
            const isToday =
              dayObj.inMonth &&
              dayObj.day === new Date().getDate() &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear();
            return (
              <div
                key={index}
                className={cns(
                  "min-h-16 p-2 rounded-lg border",
                  dayObj.inMonth ? "bg-white" : "bg-gray-50 opacity-50",
                  isToday ? "border-indigo-800" : "border-transparent",
                )}
              >
                {dayObj.inMonth && (
                  <>
                    <div
                      className={cns(
                        "text-sm font-medium flex items-center justify-center w-6 h-6 mb-1 mx-auto rounded-full",
                        isToday ? "text-indigo-800" : "text-neutral-500",
                      )}
                    >
                      {dayObj.day}
                    </div>

                    <div className="space-y-1">
                      {dayTasks.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className={cns(
                            "text-xs p-1 rounded truncate border-l-2",
                            task.status === "todo"
                              ? "border-l-gray-400 bg-gray-50"
                              : task.status === "in-progress"
                                ? "border-l-blue-400 bg-blue-50"
                                : "border-l-green-400 bg-green-50",
                          )}
                        >
                          {task.title}
                        </div>
                      ))}

                      {dayTasks.length > 3 && (
                        <div className="text-xs text-center text-muted-foreground">
                          +{dayTasks.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { ContentCalendar };
