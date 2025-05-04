import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { BadRequestError } from "../../utils/errors";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Update to validate only the appropriate part of the request
      await schema.parseAsync(req.body);
      return next();
    } catch (error: any) {
      const message =
        error.errors?.map((e: any) => e.message).join(", ") ??
        "Validation failed";
      return next(new BadRequestError(message));
    }
  };
};
