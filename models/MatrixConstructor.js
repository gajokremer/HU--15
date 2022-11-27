import db from "../repository/connection-api/database-pool";
import dbSelector from "./dbSelector";

async function constructMatrix(rows, cols, req) {
  // const username = "Emily";
  // const dbData = await db.query(
  //   "SELECT activity_name FROM ACTIVITY WHERE IDACTIVITY in (SELECT e.idActivity FROM PARTICIPANT e WHERE IDPARTICIPANT = $1) OR manager = $1;",
  //   [username]
  // );

  let { weekStart, weekEnd, username } = req;
  weekStart = new Date(weekStart);
  weekEnd = new Date(weekEnd);
  console.log("weekstart: ", weekStart);
  console.log("weekend: ", weekEnd);

  const user = await db.query(`SELECT * FROM USERS WHERE username = $1`, [
    username,
  ]);
  console.log("user: ", user.rows[0]);

  const manager = "Emily";

  const dbActivities = await db.query(
    `SELECT * FROM activity WHERE idactivity IN
    (SELECT e.idactivity FROM participant e WHERE idparticipant = $1);`,
    [username]
  );

  const activities = dbActivities.rows;
  console.log("activities: ", activities);

  const verifyActivity = (activity) => {
    const { date, time, position } = activity;
    // proofs if the activity is in the specified week

    const inWeek =
      date.day >= weekStart.getDate() && date.day <= weekEnd.getDate();
    const inTime =
      time.start <= position.row + 7 && time.end > position.row + 7;
    const inDay = dayOfWeek(date.day, date.month, date.year) === position.col;

    return inWeek && inTime && inDay;
  };

  // determine if its monday, tuesday, etc given a day, month and year
  const dayOfWeek = (day, month, year) => {
    const date = new Date(year, month, day);
    return date.getDay();
  };

  const makeActivity = (element, i, j) => {
    const activity = {
      id: element.idactivity,
      name: element.activity_name,
      date: {
        day: element.date_activity.getDate(),
        month: element.date_activity.getMonth(),
        year: element.date_activity.getFullYear(),
      },
      time: {
        start: +element.start_hour.split(":")[0],
        end: +element.end_hour.split(":")[0],
        duration:
          +element.end_hour.split(":")[0] - +element.start_hour.split(":")[0],
      },
      manager: element.manager,
      position: {
        row: i,
        col: j,
      },
    };
    return activity;
  };

  // console.log("\nactivities: ", activities);
  // console.log("weekStart: ", weekStart);
  // console.log("weekEnd: ", weekEnd);

  // const matrix = [];
  // for (let i = 0; i < rows; i++) {
  //   let date = new Date(weekStart);
  //   matrix.push([]);
  //   for (let j = 0; j < cols; j++) {
  //     // const date = new Date();
  //     const tableContent = {
  //       id: "---",
  //       row: i,
  //       col: j,
  //       date: date.getDate(),
  //       year: date.getFullYear(),
  //     };
  //     matrix[i].push(tableContent);
  //     date.setDate(date.getDate() + 1);
  //   }
  // }

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    let date = new Date(weekStart);
    matrix.push([]);
    for (let j = 0; j < cols; j++) {
      let found = false;
      // console.log("\n");
      for (let k = 0; k < activities.length && !found; k++) {
        const newActivity = makeActivity(activities[k], i, j);
        // console.log("newActivity: ", newActivity);
        if (verifyActivity(newActivity)) {
          matrix[i].push(newActivity);
          found = true;
        }
      }

      if (!found) {
        const tableContent = {
          id: "---",
          date: {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
          },
          position: {
            row: i,
            col: j,
          },
        };
        matrix[i].push(tableContent);
        date.setDate(date.getDate() + 1);
      }
    }
  }
  return matrix;
}

export default constructMatrix;
