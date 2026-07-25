import type { Request, Response } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
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
      where: { email },
    });

    // Verifica se o usuário existe
    if (!user) {
      return res.status(401).json({
        message: "Email ou senha inválidos.",
      });
    }

    // Compara a senha informada com a senha criptografada
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email ou senha inválidos.",
      });
    }

    const userInfos = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      cep: user.cep,
    };

    const token = jwt.sign(userInfos, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("user", token, {
      maxAge: 18000000,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
    });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  const { user } = req.cookies;
  if (user) {
    res.clearCookie("user", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
  }
  res.status(200).json({ message: "Logout realizado com sucesso!" });
};

export const register = async (req: Request, res: Response) => {
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
};

export const auth = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.user;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    res.status(200).json(decodedToken);
  } catch (error) {
    res.status(401).json({ message: "Não autorizado" });
  }
};

export const pedidos = async (req: Request, res: Response) => {};
