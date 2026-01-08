import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Waitlist API endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertWaitlistSchema.parse(req.body);

      // Check if email already exists
      const existing = await storage.getWaitlistByEmail(validatedData.email);
      if (existing) {
        return res.status(400).json({ 
          error: "This email is already on the waitlist" 
        });
      }

      // Create waitlist entry
      const entry = await storage.createWaitlistEntry(validatedData);
      
      return res.status(201).json({
        message: "Successfully joined the waitlist",
        id: entry.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: error.errors 
        });
      }
      console.error("Waitlist error:", error);
      return res.status(500).json({ 
        error: "Failed to join waitlist. Please try again." 
      });
    }
  });

  // Get all waitlist entries (for admin purposes)
  app.get("/api/waitlist", async (_req, res) => {
    try {
      const entries = await storage.getAllWaitlist();
      return res.json(entries);
    } catch (error) {
      console.error("Get waitlist error:", error);
      return res.status(500).json({ error: "Failed to retrieve waitlist" });
    }
  });

  return httpServer;
}
