import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.ts";
import { hashPassword, comparePassword } from "../utils/password.util.ts";
import { generateToken } from "../utils/jwt.util.ts";
import { auth } from "../config/firebase.ts";

// POST /api/auth/register — Public — Create new account
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: "Name, email, and password are required." });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({ success: false, message: "An account with this email already exists." });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || null,
    });

    const token = generateToken({ userId: user._id.toString(), email: user.email });

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login — Public — Verify credentials, return JWT
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password are required." });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    const token = generateToken({ userId: user._id.toString(), email: user.email });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me — Protected — Return current user profile
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const currentUser = (req as any).user;

    if (!currentUser) {
      res.status(401).json({ success: false, message: "Not authenticated." });
      return;
    }

    const user = await User.findById(currentUser.userId).select("-password");
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          created_at: user.created_at,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/google — Public — Authenticate with Firebase Google Sign-In
export const googleAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { idToken, email, name, photoURL } = req.body;

    if (!idToken || !email) {
      res.status(400).json({ success: false, message: "ID token and email are required." });
      return;
    }

    // Verify Firebase ID token
    let decodedToken;
    try {
      if (!auth) {
        console.log("Firebase Admin SDK not initialized - skipping token verification in development mode");
        decodedToken = {
          email: email,
          name: name || email.split('@')[0],
          picture: photoURL || null
        };
      } else {
        decodedToken = await auth.verifyIdToken(idToken);
        console.log("Firebase token verified for user:", decodedToken.email);
        
        // Ensure email from token matches provided email
        if (decodedToken.email !== email) {
          res.status(401).json({ success: false, message: "Email mismatch between token and request." });
          return;
        }
      }
    } catch (error: any) {
      console.error("Firebase token verification failed:", error);
      res.status(401).json({ 
        success: false, 
        message: "Invalid Firebase token. Please ensure Firebase Admin SDK is properly configured." 
      });
      return;
    }

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        name: name || decodedToken.name || email.split('@')[0],
        email: email.toLowerCase(),
        password: "GOOGLE_AUTH", // Placeholder password for Google users
        phone: null,
      });
      console.log("Created new Google user:", email);
    } else {
      console.log("Existing Google user found:", email);
    }

    // Generate JWT token for your application
    const token = generateToken({ userId: user._id.toString(), email: user.email });

    res.status(200).json({
      success: true,
      message: "Google authentication successful.",
      data: {
        token,
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email, 
          phone: user.phone,
          photoURL: photoURL || decodedToken.picture || null 
        },
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    next(error);
  }
};