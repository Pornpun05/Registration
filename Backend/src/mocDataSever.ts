import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
const app = express();
const port = 9000;
const saltRounds = 10;
import cors from "cors";

interface dataRegister {
  firstname: string;
  lastname: string;
  emailaddress: string;
  password: string;
  requirement: string;
}

app.use(express.json());
app.use(cors());

const MoctData: dataRegister[] = [];

app.post("/register", (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      emailaddress,
      password,
      requirement,
    }: dataRegister = req.body;

    const hash = bcrypt.hashSync(password, saltRounds);

    MoctData.push({
      firstname,
      lastname,
      emailaddress,
      password: hash,
      requirement,
    });

    console.log("User registered successfully");
    res.status(201).json({ message: "registration successful" });
    console.log(MoctData);
  } catch (err: unknown) {
    res.status(500).json({ message: "Registration failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
