import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Cria uma instância do Prisma Client e a reutiliza durante o desenvolvimento para evitar múltiplas conexões
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  });

// Armazena a instância do Prisma Client globalmente para reutilização
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}