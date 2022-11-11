import db from "../repository/connection-api/database-pool";
import dbSelector from "./dbSelector";

async function constructMatrix(rows, cols, req) {
  // const username = "Emily";
  // const dbData = await db.query(
  //   "SELECT activity_name FROM ACTIVITY WHERE IDACTIVITY in (SELECT e.idActivity FROM PARTICIPANT e WHERE IDPARTICIPANT = $1) OR manager = $1;",
  //   [username]
  // );

  // todo: Modify the query to get the data from the specified week

  const { weekStart, weekEnd } = req;
  console.log("weekstart: ", weekStart);
  console.log("weekend: ", weekEnd);

  const manager = "Emily";

  const dbData = await db.query(
    `SELECT * FROM ACTIVITY WHERE IDACTIVITY in
    (SELECT e.idActivity FROM PARTICIPANT e WHERE IDPARTICIPANT = $1) OR manager = $1
    AND DATE_ACTIVITY BETWEEN $2 AND $3;`,
    [manager, weekStart, weekEnd]
  );

  const activities = dbData.rows;
  console.log("activities: ", activities);

  const verifyActivity = (activity) => {
    return false;
  };

  const makeActivity = (element, i, j) => {
    const activity = {
      id: element.idactivity,
      name: element.activity_name,
      // date: element.date_activity,
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
      // console.log("\nNext cell");
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
          position: {
            row: i,
            col: j,
          },
          date: {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
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
