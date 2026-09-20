import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../db.js";

const deleteProductParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const createProductSchema = z.object({
  name: z.string().trim().min(2, "Nome do produto é obrigatório."),

  description: z
    .string()
    .trim()
    .min(5, "Descrição deve ter pelo menos 5 caracteres."),

  price: z.coerce.number().positive("Preço deve ser maior que zero."),

  category: z.string().trim().min(2, "Categoria é obrigatória."),
});

export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const parsedBody = createProductSchema.safeParse(req.body);

    if (!parsedBody.success) {
      console.log("ERROS ZOD:", parsedBody.error.flatten());

      return res.status(400).json({
        message: "Dados do produto inválidos.",
        errors: parsedBody.error.flatten().fieldErrors,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "A imagem do produto é obrigatória.",
      });
    }

    const { name, description, price, category } = parsedBody.data;

    const img = `/products/${req.file.filename}`;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        img,
      },
    });

    return res.status(201).json({
      message: "Produto criado com sucesso.",
      product,
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);

    return res.status(500).json({
      message: "Erro ao criar produto.",
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({});

    if (products.length === 0) {
      return res.status(404).json({
        message: "Não foram encontrados produtos.",
      });
    }

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);

    return res.status(500).json({
      message: "Erro no servidor!",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const parsedParams = deleteProductParamsSchema.safeParse(req.params);

    if (!parsedParams.success) {
      return res.status(400).json({
        message: "ID do produto inválido.",
        errors: parsedParams.error.flatten().fieldErrors,
      });
    }

    const { id } = parsedParams.data;

    const findProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!findProduct) {
      return res.status(404).json({
        message: "Produto não encontrado.",
      });
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: `Produto com id ${id} deletado com sucesso!`,
    });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);

    return res.status(500).json({
      message: "Erro no servidor!",
    });
  }
};
