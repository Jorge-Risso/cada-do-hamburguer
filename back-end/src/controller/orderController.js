import { z } from "zod";
import { prisma } from "../db.js";
const createOrderSchema = z.object({}).strict();
export async function createOrder(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }
        const parsedBody = createOrderSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Dados do pedido inválidos.",
                errors: parsedBody.error.flatten().fieldErrors,
            });
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
        const hasInvalidProduct = cartItems.some((cartItem) => !cartItem.product);
        if (hasInvalidProduct) {
            return res.status(400).json({
                message: "Há produtos inválidos no carrinho.",
            });
        }
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            const cartItem = cartItems[i];
            if (!cartItem)
                continue;
            total += cartItem.quantity * cartItem.product.price;
        }
        const order = await prisma.$transaction(async (transaction) => {
            const createdOrder = await transaction.order.create({
                data: {
                    userId: Number(userId),
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
            await transaction.cartItem.deleteMany({
                where: { userId: Number(userId) },
            });
            return createdOrder;
        });
        return res
            .status(201)
            .json({ message: "Pedido criado com sucesso.", order });
    }
    catch (error) {
        console.error("Erro ao criar pedido:", error);
        return res.status(500).json({ message: "Erro ao criar pedido." });
    }
}
export async function getOrders(req, res) {
    try {
        const userId = req.user?.id;
        const userType = req.user?.type;
        if (userType !== "admin") {
            return res.status(403).json({ message: "Acesso negado." });
        }
        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.status(200).json(orders);
    }
    catch (error) {
        console.error("Erro ao listar pedidos:", error);
        return res.status(500).json({ message: "Erro ao listar pedidos." });
    }
}
//Admin routes
export async function updateStatus(req, res) {
    try {
        const userId = req.user?.id;
        const userType = req.user?.type;
        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }
        if (userType !== "admin") {
            return res.status(403).json({
                message: "Acesso negado. Apenas administradores podem atualizar o status do pedido.",
            });
        }
        const order = await prisma.order.findUnique({
            where: { id: Number(req.params.id) },
        });
        if (!order) {
            return res.sendStatus(404).json({ message: "Pedido não encontrado." });
        }
        const { status } = req.body;
        if (!["pendente", "confirmado", "retirado", "cancelado"].includes(status)) {
            return res.status(400).json({ message: "Status inválido." });
        }
        const updatedOrder = await prisma.order.update({
            where: { id: Number(req.params.id) },
            data: { status },
        });
        return res.status(200).json({
            message: "Status do pedido atualizado com sucesso.",
            order: updatedOrder,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Erro ao atualizar status do pedido." });
    }
}
//user routes
export async function getMyOrders(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }
        const orders = await prisma.order.findMany({
            where: { userId: Number(userId) },
            include: { items: { include: { product: true } } },
            orderBy: {
                createdAt: "desc",
            },
        });
        if (orders.length === 0) {
            return res
                .status(404)
                .json({ message: "Nenhum pedido encontrado para o usuário." });
        }
        return res.status(200).json(orders);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Erro ao listar pedidos do usuário." });
    }
}
export async function getOrderById(req, res) {
    try {
        const userId = req.user?.id;
        const userType = req.user?.type;
        const orderId = Number(req.params.id);
        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }
        const isAdmin = userType === "admin";
        const isOwner = order.userId === Number(userId);
        if (!isAdmin && !isOwner) {
            return res.status(403).json({
                message: "Você não tem permissão para visualizar este pedido.",
            });
        }
        return res.status(200).json(order);
    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao buscar pedido." });
    }
}
//# sourceMappingURL=orderController.js.map