import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/auth.service";

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
      const user = await this.authService.register(req.body);
      res.status(201).json({
        status: "success",
        data: { user },
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

      res.status(200).json({
        status: "success",
        data: { user, tokens },
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
      const { refreshToken } = req.body;
      const tokens = await this.authService.refreshToken(refreshToken);

      res.status(200).json({
        status: "success",
        data: { tokens },
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
}
