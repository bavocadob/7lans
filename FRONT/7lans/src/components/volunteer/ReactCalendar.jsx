import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'


const ReactCalendar = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Wrap>
      <Calendar onChange={onchange} value={value} />
    </Wrap>
  )
}

export default ReactCalendar

