import db from "../repository/connection-api/database-pool";

async function dbSelector(data, table, condition) {
  try {
    const res = await db.query(`SELECT ${data} FROM ${table} ${condition}`);
    // return res.rows[0][data];
    return res.rows;
  } catch (err) {
    return err.stack;
  }
}

export default dbSelector;
