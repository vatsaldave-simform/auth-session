import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import {
  AuthTokens,
  LoginPayload,
  RegisterPayload,
  TokenPayload,
  UserResponse,
} from "../types/auth";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors";
import env from "../config/env";

export class AuthService {
  /**
   * Register a new user
   */
  async register(
    data: RegisterPayload
  ): Promise<{ user: UserResponse; tokens: AuthTokens }> {
    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    // Generate tokens
    const tokens = this.generateTokens(user.id);

    // Update user with refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    // Remove sensitive fields
    const { password, refreshToken, ...userWithoutSensitiveInfo } = user;

    return {
      user: userWithoutSensitiveInfo,
      tokens,
    };
  }

  /**
   * Login an existing user
   */
  async login(
    data: LoginPayload
  ): Promise<{ user: UserResponse; tokens: AuthTokens }> {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id);

    // Update user with refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    // Remove sensitive fields
    const { password, refreshToken, ...userWithoutSensitiveInfo } = user;

    return {
      user: userWithoutSensitiveInfo,
      tokens,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    // Find user with this refresh token
    const user = await prisma.user.findFirst({
      where: { refreshToken },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    // Verify refresh token
    try {
      jwt.verify(refreshToken, env.JWT_SECRET);
    } catch (error) {
      // If refresh token is invalid or expired, clear it from user
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: null },
      });

      throw new UnauthorizedError("Invalid or expired refresh token");
    }

    // Generate new tokens
    const tokens = this.generateTokens(user.id);

    // Update user with new refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return tokens;
  }

  /**
   * Logout user by clearing refresh token
   */
  async logout(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  /**
   * Get current user profile
   */
  async getProfile(userId: string): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Remove sensitive fields
    const { password, refreshToken, ...userWithoutSensitiveInfo } = user;

    return userWithoutSensitiveInfo;
  }

  /**
   * Generate JWT tokens (access and refresh)
   */
  private generateTokens(userId: string): AuthTokens {
    const payload: TokenPayload = { userId };

    // Type assertion to handle the sign options
    const accessToken = jwt.sign(
      payload,
      env.JWT_SECRET as jwt.Secret,
      { expiresIn: env.JWT_ACCESS_EXPIRES_IN } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      payload,
      env.JWT_SECRET as jwt.Secret,
      { expiresIn: env.JWT_REFRESH_EXPIRES_IN } as jwt.SignOptions
    );

    return { accessToken, refreshToken };
  }
}
