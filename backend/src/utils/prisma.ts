import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
  ],
});

// Log database queries in development mode
if (process.env.NODE_ENV === "development") {
  prisma.$on("query", (e) => {
    logger.debug(`Query: ${e.query}`);
    logger.debug(`Duration: ${e.duration}ms`);
  });

  prisma.$on("error", (e) => {
    logger.error(`Prisma Error: ${e.message}`);
  });
}

export default prisma;
