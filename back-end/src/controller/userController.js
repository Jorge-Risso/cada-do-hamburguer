import { z } from "zod";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
const loginSchema = z.object({
    email: z.string().trim().email("Informe um email válido."),
    password: z.string().min(8).max(72, "Senha inválida."),
});
const registerSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email("Informe um email válido."),
    password: z.string().min(8).max(72),
    confirmPassword: z.string().min(8).max(72),
    cep: z.string().regex(/^\d{5}-?\d{3}$/),
});
export const login = async (req, res) => {
    try {
        const parsedBody = loginSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Dados de login inválidos.",
                errors: parsedBody.error.flatten().fieldErrors,
            });
        }
        const { email, password } = parsedBody.data;
        const normalizedEmail = email.trim().toLowerCase();
        // Procura o usuário pelo email
        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
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
        const token = jwt.sign(userInfos, env.jwtSecret, {
            expiresIn: "1h",
        });
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("user", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
            secure: isProduction,
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erro interno do servidor.",
        });
    }
};
export const logout = (req, res) => {
    const { user } = req.cookies;
    const isProduction = process.env.NODE_ENV === "production";
    if (user) {
        res.clearCookie("user", {
            httpOnly: true,
            sameSite: "lax",
            secure: isProduction,
            path: "/",
        });
    }
    res.status(200).json({ message: "Logout realizado com sucesso!" });
};
export const register = async (req, res) => {
    try {
        const parsedBody = registerSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Dados de cadastro inválidos.",
                errors: parsedBody.error.flatten().fieldErrors,
            });
        }
        const { name, email, password, confirmPassword, cep } = parsedBody.data;
        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedCep = cep.trim();
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "As senhas não coincidem.",
            });
        }
        const user = await prisma.user.findFirst({
            where: {
                email: normalizedEmail,
            },
        });
        if (user) {
            return res.status(409).json({ message: "Email já cadastrado" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await prisma.user.create({
            data: {
                name: normalizedName,
                email: normalizedEmail,
                password: hashedPassword,
                cep: normalizedCep,
                type: "user",
            },
        });
        res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                cep: newUser.cep,
                type: newUser.type,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Erro interno do servidor" });
        return;
    }
};
export const auth = async (req, res) => {
    try {
        const token = req.cookies.user;
        const decodedToken = jwt.verify(token, env.jwtSecret);
        res.status(200).json(decodedToken);
    }
    catch (error) {
        res.status(401).json({ message: "Não autorizado" });
    }
};
export const pedidos = async (req, res) => { };
//# sourceMappingURL=userController.js.map