import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs"; // dayjs 라이브러리를 사용하여 현재 날짜를 가져옵니다...

function DateTime() {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 현재 날짜를 기본값으로 설정(클릭한 날짜가 나오게 수정필요)

  return (
    // 달력
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["Datepicker"]}>
        <DatePicker
          label="해당 일기의 날짜"
          slotProps={{
            textField: {
              size: "big",
            },
          }}
          format="YYYY년 MM월 DD일"
          value={selectedDate} // 현재 날짜를 기본값으로 설정합니다.
          onChange={(date) => setSelectedDate(date)} // 날짜가 선택될 때마다 선택된 날짜를 업데이트합니다.
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateTime;
