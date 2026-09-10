import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({});
    if (products.length == 0) {
      res.status(404).json({ message: "Não foram encontrados produtos" });
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor!" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findProduct = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!findProduct) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: `Produto com id ${id} deletado com sucesso!` });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor!" });
    return;
  }
};
