import pool from "../db/pool.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export async function getAllUsers(req, res) {
  try {
    const result = await pool.query("SELECT * FROM USERS");
    console.log("Users:", result.rows);
    res.send(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function updateRole(req, res) {
  const { username } = req.params;
  const { role } = req.body;

  const validRoles = ["Admin", "Viewer", "Techniker"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Ungültige Rolle." });
  }

  try {
    const result = await pool.query(
      "UPDATE users SET role = $1 WHERE username = $2 RETURNING username, role",
      [role, username]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Benutzer nicht gefunden." });
    }

    res.json(result.rows[0]); // { username, role }
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Rolle:", error);
    res.status(500).json({ message: "Datenbankfehler", error: error.message });
  }
}

export async function authUser(req, res) {
  const saltRounds = 10;
  console.log(req.body);
  const { username, password, role } = req.body;
  const b = await bcrypt.hash(password, saltRounds);
  console.log(b);
  const query = "INSERT INTO USERS (username,password,role) VALUES ($1,$2,$3)";

  try {
    const result = await pool.query(query, [username, b, role]);
    console.log("hallo");
    console.log(result);
    res.status(200).json({ message: "User authenticated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
}

export async function userLogin(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user = { username };
  const query = "SELECT * FROM USERS WHERE username = $1";
  const result = await pool.query(query, [username]);
  console.log(result.rows);
  user["role"] = result.rows[0].role;
  if (result.rows) {
    const dbPassword = result.rows[0].password;
    console.log(dbPassword);
    const match = await bcrypt.compare(password, dbPassword);
    if (match) {
      const accessToken = jsonwebtoken.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET
      );
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 3600000,
      });

      res.json({ message: "Logged in", user: user });
    } else {
      res.status(403).send("Wrong password");
    }
  }
}

export function authenticateToken(req, res, next) {
  console.log("checking if cookie is valid!");
  const token = req.cookies.access_token;
  if (token == null) return res.sendStatus(401);

  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export function checkCurrentLoggedInUser(req, res) {
  const token = req.cookies.access_token;
  if (token == null) return res.sendStatus(401);

  try {
    const data = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ message: "Session gültig", user: data });
  } catch (err) {
    res.status(403).json({ message: "Token ungültig oder abgelaufen" });
  }
}
