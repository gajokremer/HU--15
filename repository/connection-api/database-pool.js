import { Client } from "pg";

const DATABASE_URI = process.env.DATABASE_URI;
var db;

if (!db) {
  db = new Client({
    connectionString: DATABASE_URI,
    ssl: { rejectUnauthorized: false },
  });

  db.connect();
}

export default db;
