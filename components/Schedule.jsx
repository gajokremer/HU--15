import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Schedule.module.css";

// Utilizar cada evento como un objeto JSON, el cual contiene toda la información
// del evento, y luego utilizar un map para ubicarlos en una matriz.
// Finalmente, se pasa la matriz al front-end y se renderiza en la tabla.

// async function requestData(weekStart, weekEnd) {
//   //   let response = await fetch("ul", {
//   //     method: "POST",
//   //     headers: {
//   //       Accept: "application-json",
//   //       "Content-type": "application-json",
//   //     },
//   //     body: JSON.stringify(name),
//   //   });

//   let response = await fetch("/api/hello", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ weekStart, weekEnd }),
//   });
//   return response.json();
// }

const Schedule = ({ info, today }) => {
  // useEffect(() => {
  console.log("======Schedule loaded======");
  // });

  function getWeekStart(currentDate) {
    let weekStart = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 0)
    );
    console.log("weekStart:", weekStart);
    return weekStart;
  }

  function getWeekEnd(currentDate) {
    let weekEnd = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
    );
    console.log("weekend:", weekEnd);
    return weekEnd;
  }

  const [weekStart, setWeekStart] = useState(() => {
    console.log("first run");
    return getWeekStart(new Date());
  });

  const [weekEnd, setWeekEnd] = useState(() => {
    console.log("first run");
    return getWeekEnd(new Date());
  });

  useEffect(() => {
    console.log("Week has been changed!");
  }, [weekStart, weekEnd]);

  function getNextWeek() {
    setWeekStart(new Date(weekStart.setDate(weekStart.getDate() + 7)));
    setWeekEnd(new Date(weekEnd.setDate(weekEnd.getDate() + 7)));
  }

  function getPrevWeek() {
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

  let dayIndex = weekStart.getDate() - 1;
  // let lastDayIndex = weekEnd.getDate();

  const daysThisMonth = daysInMonth(
    weekStart.getMonth() + 1,
    weekStart.getFullYear()
  );

  function changeDayIndex() {
    if (dayIndex <= daysThisMonth) {
      dayIndex++;
    }
    if (dayIndex > daysThisMonth) {
      dayIndex = 1;
    }
    return dayIndex;
  }

  function indexOfThisDay(day) {
    return firstRowValues.indexOf(day);
  }

  // console.log("today: ", today);
  // console.log("today date: ", today.getDate());
  // console.log("today day: ", today.getDay());

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weekStart, weekEnd }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [weekStart, weekEnd]);

  // if (isLoading) return <p className={styles.warning}>Loading...</p>;
  if (!data) return <p className={styles.warning}>No table data</p>;

  // console.log("data: ", data);

  return (
    <>
      <div className={styles.date_section}>
        <span className={styles.day_section}>{"Today: "}</span>
        <span className={styles.month}>{today.toDateString()}</span>
        <div className={styles.day_section}>
          <div className={styles.day_picker}>
            <button className={styles.day_change} onClick={() => getPrevWeek()}>
              &lt;
            </button>
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
            <button className={styles.day_change} onClick={() => getNextWeek()}>
              &gt;
            </button>
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
      <div className={styles.schedule_section}>
        <table className={styles.schedule}>
          <thead>
            <tr>
              {/* first row map */}
              <td className={styles.first_row}>{"Hours"}</td>
              {firstRowValues.map((day) => (
                // indexOfThisDay(day) === today.getDay() &&
                // dayIndex + 1 === today.getDate() ? (
                //   <td
                //     key={day}
                //     className={`${styles.first_row} ${styles.today}`}
                //   >
                //     {`${day} `}
                //     {`${changeDayIndex(dayIndex)} `}
                //   </td>
                // ) : (
                //   <td key={day} className={styles.first_row}>
                //     {`${day} `}
                //     {`${changeDayIndex(dayIndex)} `}
                //   </td>
                // )

                <td key={day} className={styles.first_row}>
                  {`${day} ${changeDayIndex(dayIndex)}`}
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
                    cols.position.col === today.getDay() &&
                    cols.date.day === today.getDate() &&
                    cols.date.month === today.getMonth() &&
                    cols.date.year === today.getFullYear() ? (
                      <td key={Math.random()} className={styles.today}>
                        <Link href="/other">
                          <a className={styles.inner_text}>{`${cols.id}`}</a>
                        </Link>
                      </td>
                    ) : (
                      <td key={Math.random()}>
                        <Link href="/other">
                          <a className={styles.inner_text}>{cols.id}</a>
                        </Link>
                      </td>
                    )

                  // <td key={Math.random()}>
                  //   <Link href="/other">
                  //     <a className={styles.inner_text}>{cols.id}</a>
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
