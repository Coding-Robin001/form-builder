"use client"

import { useState } from "react";

export function SimpleCalendar({
  onSelect,
  selectedDate,
}: {
  onSelect: (date: Date) => void;
  selectedDate?: Date;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const daysInMonth = endOfMonth.getDate();

  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

  const today = new Date();

  return (
    <div className="space-y-2 ">
      {/* Header */}
      <div className="flex items-center justify-between text-gray-100 font-semibold mb-2">
        <button onClick={prevMonth} className="px-2 py-1 hover:bg-gray-800 rounded">
          ‹
        </button>
        <span>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </span>
        <button onClick={nextMonth} className="px-2 py-1 hover:bg-gray-800 rounded">
          ›
        </button>
      </div>

      {/* Weekday Header */}
      <div className="grid grid-cols-7 gap-1 text-center text-gray-400 text-xs">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: startOfMonth.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
          );
          const isSelected =
            selectedDate &&
            date.toDateString() === new Date(selectedDate).toDateString();
          const isToday = date.toDateString() === today.toDateString();

          return (
            <button
              key={day}
              onClick={() => onSelect(date)}
              className={`w-8 h-8 rounded-full text-sm transition-all ${
                isSelected
                  ? "bg-emerald-500 text-black"
                  : isToday
                  ? "border border-emerald-400 text-emerald-400"
                  : "hover:bg-gray-800"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}