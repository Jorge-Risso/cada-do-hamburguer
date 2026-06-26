import express from "express";
import { connection } from "./src/db.js";
import { prisma } from "./src/db.js";
import cors from "cors";
//import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());
connection();

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });

  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "Preencha os campos de email e senha" });
  }

  if (!user) {
    return res.status(401).json({ message: "Email ou senha inválidos" });
  }
  //const passwordMatch = await bcrypt.compare(password, user.password);

  // if (!passwordMatch) {
  // return res.status(401).json({ message: "Email ou senha inválidos" });
  //}

  res.status(200).json({ user });
});

app.get("/a", (req, res) => {
  console.log("ola 2");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
