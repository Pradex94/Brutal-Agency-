import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase on the server
const firebaseConfig = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Webhook for n8n to save leads directly to Firestore
  app.post("/api/webhook/save-lead", async (req, res) => {
    console.log("Webhook /api/webhook/save-lead received data:", JSON.stringify(req.body, null, 2));
    try {
      const leadData = req.body;
      
      if (!leadData.name) {
        console.error("Webhook error: Lead name is required");
        return res.status(400).json({ error: "Lead name is required" });
      }

      if (!leadData.userId) {
        console.error("Webhook error: userId is required");
        return res.status(400).json({ error: "userId is required for the lead to show on your dashboard" });
      }

      // Prepare data for Firestore
      const dataToSave = {
        ...leadData,
        createdAt: Timestamp.now(), // Use Firestore Timestamp for consistency with frontend
        status: leadData.status || 'new'
      };

      const docRef = await addDoc(collection(db, "client_leads"), dataToSave);
      console.log("Lead saved successfully with ID:", docRef.id);
      res.json({ success: true, id: docRef.id });
    } catch (error) {
      console.error("Error saving lead to Firestore:", error);
      res.status(500).json({ error: "Failed to save lead to database. Check server logs." });
    }
  });

  // Health check for the webhook
  app.get("/api/webhook/save-lead", (req, res) => {
    res.json({ status: "Webhook endpoint is active. Use POST to save leads." });
  });

  // Proxy endpoint to avoid Mixed Content (HTTPS -> HTTP) issues
  app.post("/api/generate-leads", async (req, res) => {
    console.log("Received lead generation request:", req.body);
    try {
      const { userId, businessType, location } = req.body;
      
      const webhookUrl = "http://34.93.25.87:5678/webhook/unlimited-audit";
      console.log(`Forwarding request to n8n: ${webhookUrl}`);
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          businessType,
          location
        })
      });

      console.log(`n8n response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("n8n error body:", errorBody);
        return res.status(response.status).json({ 
          error: `n8n responded with ${response.status}`,
          details: errorBody 
        });
      }

      const data = await response.json().catch(() => ({ status: 'ok' }));
      console.log("n8n response data:", data);
      res.json(data);
    } catch (error) {
      console.error("Error proxying to n8n:", error);
      res.status(500).json({ 
        error: "Failed to communicate with lead generation service",
        message: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Proxy endpoint for audit form webhook
  app.post("/api/audit-webhook", async (req, res) => {
    console.log("Received audit form submission:", req.body);
    try {
      const webhookUrl = "http://34.93.25.87:5678/webhook/seo-audit-engine";
      console.log(`Forwarding audit form to n8n: ${webhookUrl}`);
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      });

      console.log(`n8n audit response status: ${response.status} ${response.statusText}`);

      const responseText = await response.text();
      console.log("n8n audit raw response:", responseText);

      if (!response.ok) {
        return res.status(response.status).json({ 
          error: `n8n responded with ${response.status}`,
          details: responseText 
        });
      }

      try {
        const data = JSON.parse(responseText);
        res.json(data);
      } catch (e) {
        console.error("Failed to parse n8n response as JSON:", responseText);
        // If it's not JSON but the response was OK, return it as a status
        res.json({ status: 'ok', raw: responseText });
      }
    } catch (error) {
      console.error("Error proxying audit form to n8n:", error);
      res.status(500).json({ 
        error: "Failed to communicate with audit service",
        message: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
