import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const ShowCalendar = () => {

  const [date, setDate] = useState(new Date())

  return (
    <>
      <div className="header" style={{ display: "flex", flexDirection: "row-reverse" }}>
        <div className="calendar-container" style={{marginRight:"1%"}}>
          <Calendar value={date} onChange={setDate} />
          <div className="date" style={{ border: "2px solid grey", background: "lightgrey" }}>
            Selected date: {date.toDateString()}
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowCalendar