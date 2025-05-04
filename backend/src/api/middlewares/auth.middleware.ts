import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import { UnauthorizedError } from "../../utils/errors";
import { TokenPayload } from "../../types/auth";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return next(new UnauthorizedError("No token provided"));
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
      req.user = { userId: decoded.userId };
      next();
    } catch (error) {
      return next(new UnauthorizedError("Invalid or expired token"));
    }
  } catch (error) {
    next(error);
  }
};
