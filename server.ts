import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("ar_studio.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    model_url TEXT,
    config TEXT,
    status TEXT DEFAULT 'draft',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects ORDER BY created_at DESC").all();
    res.json(projects.map(p => ({ ...p, config: JSON.parse(p.config || '{}') })));
  });

  app.post("/api/projects", (req, res) => {
    const { id, name, model_url, config } = req.body;
    const stmt = db.prepare("INSERT INTO projects (id, name, model_url, config) VALUES (?, ?, ?, ?)");
    stmt.run(id, name, model_url, JSON.stringify(config || {}));
    res.json({ success: true });
  });

  app.put("/api/projects/:id", (req, res) => {
    const { name, model_url, config, status } = req.body;
    const stmt = db.prepare("UPDATE projects SET name = ?, model_url = ?, config = ?, status = ? WHERE id = ?");
    stmt.run(name, model_url, JSON.stringify(config), status, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/projects/:id", (req, res) => {
    db.prepare("DELETE FROM projects WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Mock Build Endpoint
  app.post("/api/projects/:id/build", (req, res) => {
    const id = req.params.id;
    // Simulate build process
    db.prepare("UPDATE projects SET status = 'building' WHERE id = ?").run(id);
    
    setTimeout(() => {
      db.prepare("UPDATE projects SET status = 'completed' WHERE id = ?").run(id);
    }, 10000);

    res.json({ message: "Build started" });
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
