import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Schedule.module.css";

// Utilizar cada evento como un objeto JSON, el cual contiene toda la información
// del evento, y luego utilizar un map para ubicarlos en una matriz.
// Finalmente, se pasa la matriz al front-end y se renderiza en la tabla.

const Schedule = ({ props: data, today }) => {
  // console.log("Data (Schedule): ", data);

  // const today = new Date();

  // today = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

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

  const firstRowValues = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  // let lastDayIndex = weekEnd.getDate();

  const daysThisMonth = daysInMonth(
    weekStart.getMonth() + 1,
    weekStart.getFullYear()
  );

  // console.log("firstDayIndex: ", firstDayIndex);
  // console.log("lastDayIndex: ", lastDayIndex);
  // console.log("daysThisMonth: ", daysThisMonth);

  function changeDayIndex() {
    if (firstDayIndex <= daysThisMonth) {
      firstDayIndex++;
    }
    if (firstDayIndex > daysThisMonth) {
      firstDayIndex = 1;
    }
    return firstDayIndex;
  }

  function indexOfThisDay(day) {
    return firstRowValues.indexOf(day);
  }

  console.log("today: ", today.getDate());

  return (
    <>
      <div className={styles.schedule_section}>
        <span className={styles.day_section}>{"Today: "}</span>
        <span className={styles.month}>{today.toDateString()}</span>
        <div className={styles.day_section}>
          <div className={styles.day_picker}>
            <button onClick={() => getPreviousWeek()}>&lt;</button>
            <>
              {/* <span className={styles.day_change} id={styles.prev_day}>
                <pre onClick={() => getPreviousWeek()}>&lt;</pre>
                </span>
              <span className={styles.week}>Week {week}</span> */}
            </>
            <span className={styles.week}>
              {weekStart.toLocaleDateString()}
              {" - "}
              {weekEnd.toLocaleDateString()}
            </span>
            <button onClick={() => getNextWeek()}>&gt;</button>
            <>
              {/* <span className={styles.day_change} id={styles.next_day}>
                <pre onClick={() => getNextWeek()}>&gt;</pre>
                <pre onClick={() => nextWeek()}>&gt;</pre>
              </span> */}
            </>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------- */}
      <div>
        <table className={styles.schedule}>
          <thead>
            <tr>
              {/* first row map */}
              <td className={styles.first_row}>{"Hours"}</td>
              {firstRowValues.map((day) => (
                // indexOfThisDay(day) === today.getDay() ? (
                //   <td
                //     key={day}
                //     className={`${styles.first_row} ${styles.today}`}
                //   >
                //     {`${day} `}
                //     {changeDayIndex(firstDayIndex)}
                //   </td>
                // ) : (
                //   <td key={day} className={styles.first_row}>
                //     {`${day} `}
                //     {changeDayIndex(firstDayIndex)}
                //   </td>
                // )

                <td key={day} className={styles.first_row}>
                  {`${day} ${changeDayIndex(firstDayIndex)}`}
                </td>
              ))}
            </tr>
            {/* rest of schedule map */}
            {data.map((rows) => (
              <tr key={Math.random()}>
                <td className={styles.first_col}>
                  {hours[hoursCounter++] + ":00"}
                </td>
                {rows.map(
                  (cols) =>
                    cols.col === today.getDay() &&
                    cols.date === today.getDate() ? (
                      <td key={Math.random()} className={styles.today}>
                        <Link href="/other">
                          <a
                            className={styles.inner_text}
                          >{`|${cols.content}|`}</a>
                        </Link>
                      </td>
                    ) : (
                      <td key={Math.random()}>
                        <Link href="/other">
                          <a className={styles.inner_text}>{cols.content}</a>
                        </Link>
                      </td>
                    )

                  // <td key={Math.random()}>
                  //   <Link href="/other">
                  //     <a className={styles.inner_text}>{cols}</a>
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
