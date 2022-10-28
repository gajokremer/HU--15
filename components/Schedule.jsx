import Link from "next/link";
import React from "react";
import Styles from "../styles/Schedule.module.css";

// Utilizar cada evento como un objeto JSON, el cual contiene toda la información
// del evento, y luego utilizar un map para ubicarlos en una matriz.
// Finalmente, se pasa la matriz al front-end y se renderiza en la tabla.

const Schedule = ({ props: data, week }) => {
  console.log("Data (Schedule): ", data);

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

  const nextWeek = () => {
    if (week > 0) {
      if (week === 5) {
        week = 1;
      } else {
        week++;
      }
    }
    console.log("New week: ", week);
  };

  const prevWeek = () => {
    if (week <= 5) {
      if (week === 1) {
        week = 5;
      } else {
        week--;
      }
    }
    console.log("New week: ", week);
  };

  const today = new Date();

  const getWeekOfMonth = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    return Math.ceil((date.getDate() + firstDayOfMonth.getDay()) / 7);
  };

  return (
    <>
      <div className={Styles.schedule_section}>
        {/* <div className={Styles.month}>January</div> */}
        <span className={Styles.month}>{today.toDateString()}</span>
        <div className={Styles.day_section}>
          <div className={Styles.day_picker}>
            <span className={Styles.day_change} id={Styles.prev_day}>
              <pre onClick={() => prevWeek()}>&lt;</pre>
            </span>
            <span className={Styles.week}>Week {getWeekOfMonth(today)}</span>
            <span className={Styles.day_change} id={Styles.next_day}>
              <pre onClick={() => nextWeek()}>&gt;</pre>
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
              <tr key={""}>
                <td className={Styles.first_col}>{hours[counter++] + ":00"}</td>
                {rows.map((cols) => (
                  <td key={""}>
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
