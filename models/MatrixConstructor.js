import db from "../repository/connection-api/database-pool";
import dbSelector from "./dbSelector";

async function constructMatrix(rows, cols, req) {
  // const username = "Emily";
  // const dbData = await db.query(
  //   "SELECT activity_name FROM ACTIVITY WHERE IDACTIVITY in (SELECT e.idActivity FROM PARTICIPANT e WHERE IDPARTICIPANT = $1) OR manager = $1;",
  //   [username]
  // );

  const username = "Emily";
  const dbData = await db.query(
    "SELECT * FROM ACTIVITY WHERE IDACTIVITY in (SELECT e.idActivity FROM PARTICIPANT e WHERE IDPARTICIPANT = $1) OR manager = $1;",
    [username]
  );

  const activities = dbData.rows;
  console.log("activities: ", activities);

  const evaluateActivity = (activity, x, y) => {
    const activityDate = activity.date;
  };

  const makeActivity = (element) => {
    const activity = {
      id: element.idactivity,
      name: element.activity_name,
      date: element.date_activity,
      start: element.start_hour,
      end: element.end_hour,
      manager: element.manager,
    };
    return activity;
  };

  // const matrix = [];
  // for (let i = 0; i < rows; i++) {
  //   matrix.push([]);
  //   for (let j = 0; j < cols; j++) {
  //     // const activity = makeActivity(activities[0]);
  //     // matrix[i].push(activity);

  //     let found = false;
  //     let activity = null;
  //     for (let k = 0; k < activities.length; k++) {
  //       activity = makeActivity(activities[k]);
  //     }
  //     matrix[i].push(activity);
  //   }
  // }

  // console.log("weekStart: ", weekStart);
  // console.log("weekEnd: ", weekEnd);

  const { weekStart, weekEnd } = req;
  console.log("weekstart: ", weekStart);
  console.log("weekend: ", weekEnd);

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    let date = new Date(weekStart);
    matrix.push([]);
    for (let j = 0; j < cols; j++) {
      // const date = new Date();
      const tableContent = {
        id: "---",
        row: i,
        col: j,
        date: date.getDate(),
        year: date.getFullYear(),
      };
      matrix[i].push(tableContent);
      date.setDate(date.getDate() + 1);
    }
  }
  return matrix;
}

export default constructMatrix;
