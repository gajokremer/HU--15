function constructMatrix(rows, cols) {
  console.log("Begin constructMatrix");
  const array = [];
  for (let i = 0; i < rows; i++) {
    array.push([]);
    for (let j = 0; j < cols; j++) {
      // array[i].push("---");
      const tableContent = { content: "---", x: i, y: j };
      array[i].push(tableContent);
    }
  }
  console.log("End constructMatrix");
  return array;
}

export default constructMatrix;
