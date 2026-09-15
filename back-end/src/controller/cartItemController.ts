import type { Request, Response } from "express";
import { prisma } from "../db.js";

export async function getCartItems(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        product: true,
      },
    });

    return res.status(200).json(cartItems);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar carrinho." });
  }
}

export async function addCartItem(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const { productId, quantity } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const productIdNumber = Number(productId);
    const quantityNumber = Number(quantity);

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        userId: Number(userId),
        productId: productIdNumber,
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantityNumber,
        },
        include: {
          product: true,
        },
      });

      return res.status(200).json(updatedCartItem);
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        userId: Number(userId),
        productId: productIdNumber,
        quantity: quantityNumber,
      },
      include: {
        product: true,
      },
    });

    return res.status(201).json(cartItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao adicionar item ao carrinho." });
  }
}

export async function updateCartItemQuantity(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const { itemId, quantity } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    if (Number(quantity) <= 0) {
      await prisma.cartItem.delete({
        where: {
          id: Number(itemId),
          userId: Number(userId),
        },
      });

      return res.status(200).json({ message: "Item removido do carrinho." });
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: Number(itemId),
        userId: Number(userId),
      },
      data: {
        quantity: Number(quantity),
      },
      include: {
        product: true,
      },
    });

    return res.status(200).json(updatedCartItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar quantidade do carrinho." });
  }
}
