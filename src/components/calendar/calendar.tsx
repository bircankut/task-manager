"use client";

import Calendar from "react-calendar";
import React, { useState, useEffect } from "react";
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;

const DashboardCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<
    ValuePiece | [ValuePiece, ValuePiece] | null
  >(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDateChange = (
    value: ValuePiece | [ValuePiece, ValuePiece] | null,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setSelectedDate(value);
  };

  if (!isClient) {
    return <div>Loading...</div>; // Or any fallback loading UI
  }

  return (
    <div className="h-full w-full p-4">

      <div className="w-full h-full ">
        <Calendar
          className="w-full h-full grid "
          onChange={handleDateChange}
          value={selectedDate}

          tileClassName={({ date, view }) =>
            view === "month" ? "border-t border-l border-r p-1" : undefined
          }
        />
      </div>
    </div>
  );
};

export default DashboardCalendar;
