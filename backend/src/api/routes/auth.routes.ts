import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validators/auth.validator";

const router = Router();
const authController = new AuthController();

// Public routes
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  authController.refreshToken
);

// Protected routes
router.use(authenticate);
router.post("/logout", authController.logout);
router.get("/profile", authController.getProfile);

export default router;
