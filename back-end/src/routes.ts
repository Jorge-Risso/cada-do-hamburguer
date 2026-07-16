import type { Request, Response } from "express";
import { prisma } from "./db.js";
import bcrypt from "bcrypt";
import { Router } from "express";
import { auth, login, register, logout } from "./controller/userController.js";
import { authMiddleware } from "./middlewares/auth-Middleware.js";
export const router = Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);
