import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { isAuthenticatedUser } from "../types/auth.js";
import { prisma } from "../db.js";
export const authMiddleware = (req, res, next) => {
    try {
        const { user } = req.cookies;
        if (typeof user !== "string") {
            return res.status(401).json({
                message: "Não autorizado.",
            });
        }
        const decoded = jwt.verify(user, env.jwtSecret);
        if (!isAuthenticatedUser(decoded)) {
            return res.status(401).json({
                message: "Token inválido.",
            });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Não autorizado.",
        });
    }
};
export const adminMiddleware = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: "Não autorizado.",
            });
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });
        if (!currentUser || currentUser.type !== "admin") {
            return res.status(403).json({
                message: "Acesso negado.",
            });
        }
        next();
    }
    catch (error) {
        console.error("Erro ao verificar administrador:", error);
        return res.status(500).json({
            message: "Erro interno do servidor.",
        });
    }
};
//# sourceMappingURL=auth-Middleware.js.map