import db from "../repository/connection-api/database-pool";
import dbSelector from "./dbSelector";

async function constructMatrix(rows, cols) {
  const username = "pipocast";
  const dbData = await db.query(
    "SELECT activity_name FROM ACTIVITY  WHERE IDACTIVITY in (SELECT  e.idActivity FROM PARTICIPANT e WHERE IDPARTICIPANT = $1) OR manager  = $1;",
    [username]
  );

  //const dbData = await dbSelector("*", "users", "where username = 'pipocast'");
  // const username = dbData[0].username;

  console.log(username);
  console.log(dbData);

  const array = [];
  for (let i = 0; i < rows; i++) {
    array.push([]);
    for (let j = 0; j < cols; j++) {
      // array[i].push("---");
      const date = new Date();
      const tableContent = {
        content: "---",
        row: i,
        col: j,
        date: date.getDate(),
      };
      array[i].push(tableContent);
    }
  }
  return array;
}

export default constructMatrix;
