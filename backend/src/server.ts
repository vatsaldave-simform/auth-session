import app from "./app";
import env from "./config/env";
import logger from "./utils/logger";
import prisma from "./utils/prisma";

// Define server port
const PORT = env.PORT;

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
  logger.info(`Health check available at http://localhost:${PORT}/health`);
  logger.info(`API available at http://localhost:${PORT}/api/v1`);
});

// Handle unhandled Promise rejections
process.on("unhandledRejection", (err: Error) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(err.stack);

  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  logger.error(err.stack);
  process.exit(1);
});

// Handle cleanup on shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(async () => {
    await prisma.$disconnect();
    logger.info("Process terminated!");
    process.exit(0);
  });
});
