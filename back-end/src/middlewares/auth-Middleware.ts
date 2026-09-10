import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req.cookies;
    const decoded = jwt.verify(user, process.env.JWT_SECRET as string);
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
    if (!decoded) {
      return res.status(401).json({ message: "Não autorizado." });
    } else {
      (req as any).user = decoded;
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Não autorizado." });
  }
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = (req as any).user;

  if (user?.type !== "admin") {
    return res.status(403).json({
      message: "Credenciais inválidas para acessar esta rota.",
    });
  }

  next();
};
