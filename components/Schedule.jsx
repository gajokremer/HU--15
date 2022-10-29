import Link from "next/link";
import React, { useEffect, useState } from "react";
import Styles from "../styles/Schedule.module.css";

// Utilizar cada evento como un objeto JSON, el cual contiene toda la información
// del evento, y luego utilizar un map para ubicarlos en una matriz.
// Finalmente, se pasa la matriz al front-end y se renderiza en la tabla.

const Schedule = ({ props: data, today }) => {
  // console.log("Data (Schedule): ", data);

  // const today = new Date();

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

  useEffect(() => {
    console.log("Week has been changed!");
  }, [weekStart, weekEnd]);

  function getNextWeek() {
    setWeekStart(new Date(weekStart.setDate(weekStart.getDate() + 7)));
    setWeekEnd(new Date(weekEnd.setDate(weekEnd.getDate() + 7)));
  }

  function getPreviousWeek() {
    setWeekStart(new Date(weekStart.setDate(weekStart.getDate() - 7)));
    setWeekEnd(new Date(weekEnd.setDate(weekEnd.getDate() - 7)));
  }

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

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

  let hoursCounter = 0;

  let firstDayIndex = weekStart.getDate() - 1;
  let lastDayIndex = weekEnd.getDate();

  const daysThisMonth = daysInMonth(
    weekStart.getMonth() + 1,
    weekStart.getFullYear()
  );

  console.log("firstDayIndex: ", firstDayIndex);
  console.log("lastDayIndex: ", lastDayIndex);
  console.log("daysThisMonth: ", daysThisMonth);

  function changeDayIndex() {
    if (firstDayIndex <= daysThisMonth) {
      firstDayIndex++;
    }
    if (firstDayIndex > daysThisMonth) {
      firstDayIndex = 1;
    }
    return firstDayIndex;
  }

  return (
    <>
      <div className={Styles.schedule_section}>
        <span className={Styles.day_section}>{"Today: "}</span>
        <span className={Styles.month}>{today.toDateString()}</span>
        <div className={Styles.day_section}>
          <div className={Styles.day_picker}>
            <button onClick={() => getPreviousWeek()}>&lt;</button>
            <>
              {/* <span className={Styles.day_change} id={Styles.prev_day}>
                <pre onClick={() => getPreviousWeek()}>&lt;</pre>
                </span>
              <span className={Styles.week}>Week {week}</span> */}
            </>
            <span className={Styles.week}>
              {weekStart.toLocaleDateString()}
              {" - "}
              {weekEnd.toLocaleDateString()}
            </span>
            <button onClick={() => getNextWeek()}>&gt;</button>
            <>
              {/* <span className={Styles.day_change} id={Styles.next_day}>
                <pre onClick={() => getNextWeek()}>&gt;</pre>
                <pre onClick={() => nextWeek()}>&gt;</pre>
              </span> */}
            </>
          </div>
        </div>
      </div>

      <div>
        <table className={Styles.schedule}>
          <thead>
            <tr>
              {weekdays.map((day) => (
                <td key={day} className={Styles.first_row}>
                  {`${day} `}
                  {changeDayIndex(firstDayIndex)}
                </td>
              ))}
            </tr>
            {data.map((rows) => (
              <tr key={Math.random()}>
                <td className={Styles.first_col}>
                  {hours[hoursCounter++] + ":00"}
                </td>
                {rows.map(
                  (cols) =>
                    cols.y === today.getDay() ? (
                      <td key={Math.random()} className={Styles.today}>
                        <Link href="/other">
                          <a className={Styles.inner_text}>{cols.content}</a>
                        </Link>
                      </td>
                    ) : (
                      <td key={Math.random()}>
                        <Link href="/other">
                          <a className={Styles.inner_text}>{cols.content}</a>
                        </Link>
                      </td>
                    )

                  // <td key={Math.random()}>
                  //   <Link href="/other">
                  //     <a className={Styles.inner_text}>{cols}</a>
                  //   </Link>
                  // </td>
                )}
              </tr>
            ))}
          </thead>
        </table>
      </div>
    </>
  );
};

export default Schedule;
