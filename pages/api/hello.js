import { render } from "react-dom";
import constructMatrix from "../../models/MatrixConstructor";
import db from "../../repository/connection-api/database-pool";

export default function handler(req, res) {
  const matrix = constructMatrix(16, 6);
  console.log("Matrix: ", matrix);
  return res.json(matrix);
}
