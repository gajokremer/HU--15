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

  const activities = dbData.rows[0];
  console.log("activities: ", activities);

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push([]);
    for (let j = 0; j < cols; j++) {
      // array[i].push("---");
      const date = new Date();
      const tableContent = {
        content: "---",
        row: i,
        col: j,
        date: date.getDate(),
      };
      matrix[i].push(tableContent);
    }
  }
  return matrix;
}

export default constructMatrix;
