import type { Request, Response } from "express";
import { prisma } from "../db.js";

export async function createOrder(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: Number(userId),
      },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Carrinho vazio. Não é possível criar um pedido." });
    }

    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const cartItem = cartItems[i];
      if (!cartItem) continue;
      total += cartItem.quantity * cartItem.product.price;
    }

    const order = await prisma.order.create({
      data: {
        userId: userId,
        total: total,
        items: {
          create: cartItems.map((cartItem) => ({
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            price: cartItem.product.price,
          })),
        },
      },
      include: { items: true },
    });

    await prisma.cartItem.deleteMany({
      where: {
        userId: Number(userId),
      },
    });

    res.status(201).json({ message: "Pedido criado com sucesso.", order });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar pedido." });
  }
}
