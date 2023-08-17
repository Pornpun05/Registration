import express, { Request, Response } from "express";
const mysql = require("mysql2");
import bcrypt from "bcrypt";
const app = express();
const port = 9000;
const saltRounds = 10;
import cors from "cors";

const database = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "register",
});
database.connect();

interface dataRegister {
  firstname: string;
  lastname: string;
  emailaddress: string;
  password: string;
  requirement: string;
}

app.use(express.json());
app.use(cors());

app.post("/register", (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    emailaddress,
    password,
    requirement,
  }: dataRegister = req.body;

  const hash = bcrypt.hashSync(password, saltRounds);

  let query = `INSERT INTO user
  (firstname, lastname, emailaddress, password, requirement)
  VALUES ('${firstname}', '${lastname}', '${emailaddress}', '${hash}', '${requirement}')`;

  database.query(query, (err: unknown) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ message: "Registration failed" });
    } else {
      console.log("User registered successfully");
      res.status(201).json({ message: "registration successful" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
