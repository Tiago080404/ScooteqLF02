import pool from "../db/pool.js";

export async function changeStatus(req, res) {
  console.log(req.body);
  //const status = req.body.status;
  const { status, id } = req.body;
  console.log(status);
  const query = "UPDATE scooters SET status = $1 WHERE id = $2";
  const values = [status, id];
  const result = await pool.query(query, values);
  res.send(result.rows);
}
