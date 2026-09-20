import { prisma } from "./db.js";
import bcrypt from "bcrypt";
import { Router } from "express";
import { upload } from "./middlewares/upload-Middleware.js";
import { auth, login, register, logout } from "./controller/userController.js";
import { authMiddleware, adminMiddleware, } from "./middlewares/auth-Middleware.js";
import { getProducts, deleteProduct, createProduct, } from "./controller/ProductController.js";
import { getCartItems, addCartItem, updateCartItemQuantity, } from "./controller/cartItemController.js";
import { createOrder, getOrderById, getOrders, getMyOrders, updateStatus, } from "./controller/orderController.js";
export const router = Router();
router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);
//Rotas de produto
router.get("/products", getProducts);
router.post("/products", authMiddleware, adminMiddleware, upload.single("img"), createProduct);
router.delete("/product-delete/:id", authMiddleware, adminMiddleware, deleteProduct);
router.get("/cart-items", authMiddleware, getCartItems);
router.post("/cart-items", authMiddleware, addCartItem);
router.patch("/cart-items/update-quantity", authMiddleware, updateCartItemQuantity);
//Orders
router.get("/orders", authMiddleware, adminMiddleware, getOrders);
router.get("/orders/me", authMiddleware, getMyOrders);
router.get("/orders/:id", authMiddleware, getOrderById);
router.patch("/orders/:id/status", authMiddleware, adminMiddleware, updateStatus);
router.post("/create-order", authMiddleware, createOrder);
//# sourceMappingURL=routes.js.map