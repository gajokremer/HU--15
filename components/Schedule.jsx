import Link from "next/link";
import Styles from "../styles/Schedule.module.css";

// export default function Table(props) {
//   console.log(props);
//   return (
//     <div>
//       <table className={Styles.schedule}>
//         {props.data.map((e) => (
//           <tr>
//             {e.map((i) => (
//               <td>{i}</td>
//             ))}
//           </tr>
//         ))}
//       </table>
//     </div>
//   );
// }

import React from "react";

const Schedule = ({ props, week }) => {
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
    console.log(week);
  };

  const prevWeek = () => {
    if (week <= 5) {
      if (week === 1) {
        week = 5;
      } else {
        week--;
      }
    }
    console.log(week);
  };

  return (
    <>
      <div className={Styles.schedule_section}>
        <div className={Styles.month}>January</div>
        <div className={Styles.day_section}>
          <div className={Styles.day_picker}>
            <span className={Styles.day_change} id={Styles.prev_day}>
              <pre onClick={() => prevWeek()}>&lt;</pre>
            </span>
            <span className={Styles.week}>Week {week}</span>
            <span className={Styles.day_change} id={Styles.next_day}>
              <pre onClick={() => nextWeek()}>&gt;</pre>
            </span>
          </div>
        </div>
      </div>

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
            {props.map((rows) => (
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
