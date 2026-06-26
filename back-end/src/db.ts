import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

async function connection() {
  try {
    await prisma.$connect();
    console.log("Conectado ao BD.");
  } catch (error) {
    console.error("Erro ao tentar se conectar ao BD:", error);
  }
}

export { connection };
