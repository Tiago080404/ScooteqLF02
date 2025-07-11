import pool from "../db/pool.js";

export async function getAllUsers(req, res) {
  const query = "SELECT * FROM USERS";
  const result = await pool.query(query);
  console.log("Users:", result.rows);
  res.send(result.rows);
}
