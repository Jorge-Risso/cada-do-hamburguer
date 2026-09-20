import { z } from "zod";
import { prisma } from "../db.js";
const addCartItemSchema = z.object({
    productId: z.coerce.number().int().positive(),
    quantity: z.coerce.number().int().min(1).max(99),
});
const updateCartItemQuantitySchema = z.object({
    itemId: z.coerce.number().int().positive(),
    quantity: z.coerce.number().int().min(0).max(99),
});
export async function getCartItems(req, res) {
    try {
        const userId = req.user?.id;
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
    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao buscar carrinho." });
    }
}
export async function addCartItem(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }
        const parsedBody = addCartItemSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Dados do carrinho inválidos.",
                errors: parsedBody.error.flatten().fieldErrors,
            });
        }
        const { productId, quantity } = parsedBody.data;
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });
        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }
        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                userId: Number(userId),
                productId,
            },
        });
        if (existingCartItem) {
            const updatedCartItem = await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: {
                    quantity: existingCartItem.quantity + quantity,
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
                productId,
                quantity,
            },
            include: {
                product: true,
            },
        });
        return res.status(201).json(cartItem);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Erro ao adicionar item ao carrinho." });
    }
}
export async function updateCartItemQuantity(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Usuário não autenticado.",
            });
        }
        const parsedBody = updateCartItemQuantitySchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Dados do carrinho inválidos.",
                errors: parsedBody.error.flatten().fieldErrors,
            });
        }
        const { itemId, quantity } = parsedBody.data;
        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: itemId,
                userId,
            },
        });
        if (!cartItem) {
            return res.status(404).json({
                message: "Item não encontrado.",
            });
        }
        if (quantity === 0) {
            await prisma.cartItem.delete({
                where: {
                    id: cartItem.id,
                },
            });
            return res.status(200).json({
                message: "Item removido do carrinho.",
            });
        }
        const updatedCartItem = await prisma.cartItem.update({
            where: {
                id: cartItem.id,
            },
            data: {
                quantity,
            },
            include: {
                product: true,
            },
        });
        return res.status(200).json(updatedCartItem);
    }
    catch (error) {
        console.error("Erro ao atualizar quantidade do carrinho:", error);
        return res.status(500).json({
            message: "Erro ao atualizar quantidade do carrinho.",
        });
    }
}
//# sourceMappingURL=cartItemController.js.map