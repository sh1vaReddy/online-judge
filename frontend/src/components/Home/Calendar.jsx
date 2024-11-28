import { useState } from "react";

const Calendar = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayIndex = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (

      <div className="max-w-md px-6 py-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-black dark:text-white">
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </h2>
          <div className="flex">
            <button
              onClick={previousMonth}
              className="p-2 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full transition"
            >
              &#8249;
            </button>
            <button
              onClick={nextMonth}
              className="ml-2 p-2 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full transition"
            >
              &#8250;
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array(firstDayIndex)
            .fill(null)
            .map((_, idx) => (
              <div key={`empty-${idx}`}></div>
            ))}
          {Array.from({ length: daysInMonth }, (_, day) => {
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day + 1
            );
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = date.toDateString() === selectedDay.toDateString();

            return (
              <button
                key={day}
                className={`flex items-center justify-center h-10 w-10 rounded-full transition ${
                  isToday
                    ? "bg-black text-white font-bold"
                    : isSelected
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                } hover:bg-gray-500 dark:hover:bg-gray-600`}
                onClick={() => setSelectedDay(date)}
              >
                {day + 1}
              </button>
            );
          })}
        </div>
      </div>
  
  );
};

export default Calendar;
