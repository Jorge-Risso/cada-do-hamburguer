import express, { type Request, type Response } from "express";
import { connection } from "./src/db.js";
import { prisma } from "./src/db.js";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());
connection();

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação dos dados
    if (!email || !password) {
      return res.status(400).json({
        message: "Email e senha são obrigatórios!",
      });
    }

    // Procura o usuário pelo email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Verifica se o usuário existe
    if (!user) {
      return res.status(401).json({
        message: "Email ou senha inválidos.",
      });
    }

    // Verifica se há senha cadastrada
    if (!user.password) {
      return res.status(400).json({
        message: "Usuário não possui senha cadastrada.",
      });
    }

    // Compara a senha informada com a senha criptografada
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email ou senha inválidos.",
      });
    }

    // Login realizado com sucesso
    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
});

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword, cep } = req.body;
    if (!name || !email || !password || !confirmPassword || !cep) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
      return;
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "As senhas não coincidem" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user?.email === email) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cep,
        type: "user",
      },
    });
    res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso", newUser });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
