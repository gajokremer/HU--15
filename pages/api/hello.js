import { render } from "react-dom";
import renderMatrix from "../../models/Matrix";

export default function handler(req, res) {
  const matrix = renderMatrix(16, 6);
  console.log(matrix);
  return res.json(matrix);
}
