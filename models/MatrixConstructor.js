import db from "../repository/connection-api/database-pool";
import dbSelector from "./dbSelector";

async function constructMatrix(rows, cols) {
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
    console.log("activity: ", activity.idactivity);
    return false;
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

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push([]);
    for (let j = 0; j < cols; j++) {
      const activity = makeActivity(activities[0]);
      matrix[i].push(activity);
    }
  }

  // const matrix = [];
  // for (let i = 0; i < rows; i++) {
  //   matrix.push([]);
  //   for (let j = 0; j < cols; j++) {
  //     const date = new Date();
  //     const tableContent = {
  //       content: "---",
  //       row: i,
  //       col: j,
  //       date: date.getDate(),
  //     };
  //     matrix[i].push(tableContent);
  //   }
  // }
  return matrix;
}

export default constructMatrix;
