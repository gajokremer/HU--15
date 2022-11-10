// import { render } from "react-dom";
import constructMatrix from "../../models/MatrixConstructor";
import db from "../../repository/connection-api/database-pool";

export default async function handler(req, res) {
  console.log("\n\nreq: ", req.body);
  const matrix = await constructMatrix(16, 7, req.body);
  // console.log("Matrix: ", matrix);
  return res.json(matrix);
}
