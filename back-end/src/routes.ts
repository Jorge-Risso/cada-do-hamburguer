import type { Request, Response } from "express";
import { prisma } from "./db.js";
import bcrypt from "bcrypt";
import { Router } from "express";
import { auth, login, register, logout } from "./controller/userController.js";
import {
  authMiddleware,
  adminMiddleware,
} from "./middlewares/auth-Middleware.js";
import { getProducts, deleteProduct } from "./controller/ProductController.js";
import {
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
} from "./controller/cartItemController.js";

export const router = Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);

//Rotas de produto
router.get("/products", getProducts);
router.delete(
  "/product-delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct,
);

router.get("/cart-items", authMiddleware, getCartItems);
router.post("/cart-items", authMiddleware, addCartItem);
router.patch(
  "/cart-items/update-quantity",
  authMiddleware,
  updateCartItemQuantity,
);
