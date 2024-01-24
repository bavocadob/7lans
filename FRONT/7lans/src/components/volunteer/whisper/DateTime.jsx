import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

//https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/getting-started
function DateTime() {
  const [selectedDay, setSelectedDay] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });

  const handleDatePickerUnmount = () => {
    window.removeEventListener("click", handleWindowClick);
  };

  const handleWindowClick = () => {
    // 이벤트 처리 로직
  };

  return (
    <div>
      <DatePicker
        value={selectedDay}
        onChange={(selected) => {
          if (selected) {
            setSelectedDay(selected);
          }
        }}
        inputPlaceholder="Select a day"
        shouldHighlightWeekends
        onUnmount={handleDatePickerUnmount}
      />
    </div>
  );
}

export default DateTime;
