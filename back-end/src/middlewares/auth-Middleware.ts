import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req.cookies;
    const decoded = jwt.verify(user, env.jwtSecret);
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
