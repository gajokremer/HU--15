import Link from "next/link";
import React, { useState } from "react";
import Styles from "../styles/Schedule.module.css";

// Utilizar cada evento como un objeto JSON, el cual contiene toda la información
// del evento, y luego utilizar un map para ubicarlos en una matriz.
// Finalmente, se pasa la matriz al front-end y se renderiza en la tabla.

const Schedule = ({ props: data }) => {
  console.log("Data (Schedule): ", data);

  const today = new Date();

  // const getWeekOfMonth = (date) => {
  //   const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  //   return Math.ceil((date.getDate() + firstDayOfMonth.getDay()) / 7);
  // };

  // function getWeekDates(currentDate) {
  //   var currentDate = new Date();
  //   var weekStart = new Date(
  //     currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 0)
  //   );
  //   var weekEnd = new Date(
  //     currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
  //   );
  //   return [weekStart, weekEnd];
  // }

  function getWeekStart(currentDate) {
    var weekStart = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 0)
    );
    return weekStart;
  }

  function getWeekEnd(currentDate) {
    var weekEnd = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
    );
    return weekEnd;
  }

  const [weekStart, setWeekStart] = useState(() => {
    console.log("first run");
    return getWeekStart(today);
  });

  const [weekEnd, setWeekEnd] = useState(() => {
    console.log("first run");
    return getWeekEnd(today);
  });

  function getNextWeek() {
    setWeekStart(new Date(weekStart.setDate(weekStart.getDate() + 7)));
    setWeekEnd(new Date(weekEnd.setDate(weekEnd.getDate() + 7)));
  }

  function getPreviousWeek() {
    setWeekStart(new Date(weekStart.setDate(weekStart.getDate() - 7)));
    setWeekEnd(new Date(weekEnd.setDate(weekEnd.getDate() - 7)));
  }

  // const [week, setWeek] = useState(() => {
  //   console.log("First run");
  //   return getWeekOfMonth(today);
  // });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = [
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
  ];

  let counter = 0;

  // function nextWeek() {
  //   if (week > 0) {
  //     if (week === 5) {
  //       setWeek(1);
  //     } else {
  //       setWeek(week + 1);
  //     }
  //   }
  //   console.log("Next week: ", week);
  // }

  // function prevWeek() {
  //   if (week <= 5) {
  //     if (week === 1) {
  //       setWeek(5);
  //     } else {
  //       setWeek(week - 1);
  //     }
  //   }
  //   console.log("Prev week: ", week);
  // }

  return (
    <>
      <div className={Styles.schedule_section}>
        <span className={Styles.month}>{today.toDateString()}</span>
        <div className={Styles.day_section}>
          <div className={Styles.day_picker}>
            <span className={Styles.day_change} id={Styles.prev_day}>
              <pre onClick={() => getPreviousWeek()}>&lt;</pre>
              {/* <pre onClick={() => prevWeek()}>&lt;</pre> */}
            </span>
            {/* <span className={Styles.week}>Week {week}</span> */}
            <span className={Styles.week}>
              {weekStart.toLocaleDateString()}
              {" - "}
              {weekEnd.toLocaleDateString()}
            </span>
            <span className={Styles.day_change} id={Styles.next_day}>
              <pre onClick={() => getNextWeek()}>&gt;</pre>
              {/* <pre onClick={() => nextWeek()}>&gt;</pre> */}
            </span>
          </div>
        </div>
      </div>

      {/* <p>{data}</p> */}
      <div>
        <table className={Styles.schedule}>
          <thead>
            <tr>
              {weekdays.map((day) => (
                <td key={day} className={Styles.first_row}>
                  {day}
                </td>
              ))}
            </tr>
            {data.map((rows) => (
              <tr key={``}>
                <td className={Styles.first_col}>{hours[counter++] + ":00"}</td>
                {rows.map((cols) => (
                  <td key={``}>
                    <Link href="/other">
                      <a className={Styles.inner_text}>{cols}</a>
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </thead>
        </table>
      </div>
    </>
  );
};

export default Schedule;
