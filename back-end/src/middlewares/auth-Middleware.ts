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
