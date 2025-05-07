import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/auth.service";
import env from "../../config/env";

export class AuthController {
  readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Register a new user
   */
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, tokens } = await this.authService.register(req.body);

      // Set refresh token in HTTP-only cookie
      this.setRefreshTokenCookie(res, tokens.refreshToken);

      res.status(201).json({
        status: "success",
        data: {
          user,
          accessToken: tokens.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Login user
   */
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, tokens } = await this.authService.login(req.body);

      // Set refresh token in HTTP-only cookie
      this.setRefreshTokenCookie(res, tokens.refreshToken);

      res.status(200).json({
        status: "success",
        data: {
          user,
          accessToken: tokens.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Refresh access token
   */
  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get refresh token from cookie instead of request body
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          status: "fail",
          message: "Refresh token is required",
        });
        return;
      }

      const tokens = await this.authService.refreshToken(refreshToken);

      // Set new refresh token in HTTP-only cookie
      this.setRefreshTokenCookie(res, tokens.refreshToken);

      res.status(200).json({
        status: "success",
        data: { accessToken: tokens.accessToken },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Logout user
   */
  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.logout(req.user!.userId);

      // Clear the refresh token cookie
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/auth",
      });

      res.status(200).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get current user profile
   */
  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.getProfile(req.user!.userId);

      res.status(200).json({
        status: "success",
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Helper method to set refresh token cookie
   */
  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    // Parse the JWT_REFRESH_EXPIRES_IN value to get milliseconds
    const refreshExpiry = env.JWT_REFRESH_EXPIRES_IN;
    let maxAge = 7 * 24 * 60 * 60 * 1000; // Default 7 days in milliseconds

    if (refreshExpiry.endsWith("d")) {
      maxAge = parseInt(refreshExpiry.slice(0, -1)) * 24 * 60 * 60 * 1000;
    } else if (refreshExpiry.endsWith("h")) {
      maxAge = parseInt(refreshExpiry.slice(0, -1)) * 60 * 60 * 1000;
    } else if (refreshExpiry.endsWith("m")) {
      maxAge = parseInt(refreshExpiry.slice(0, -1)) * 60 * 1000;
    } else if (refreshExpiry.endsWith("s")) {
      maxAge = parseInt(refreshExpiry.slice(0, -1)) * 1000;
    }

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "lax",
      maxAge: maxAge,
      path: "/",
    });
  }
}
