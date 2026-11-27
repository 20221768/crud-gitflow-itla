const http = require("http");
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "data.json");

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, "utf8").replace(/^\uFEFF/, "").trim();
  if (!raw) return [];
  return JSON.parse(raw);
}

function writeData(items) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

function formatDate(date = new Date()) {
  return date.toISOString().split("T")[0];
}

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "GET" && req.url === "/items") {
    const items = readData();
    res.writeHead(200);
    return res.end(JSON.stringify(items));
  }

  if (req.method === "POST" && req.url === "/items") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const parsed = JSON.parse(body.replace(/^\uFEFF/, "") || "{}");
      if (!parsed.name || !parsed.name.trim()) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "El campo name es obligatorio" }));
      }
      const items = readData();
      const newItem = {
        id: items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        name: parsed.name.trim(),
        status: parsed.status || "pendiente",
        createdAt: formatDate()
      };
      items.push(newItem);
      writeData(items);
      res.writeHead(201);
      res.end(JSON.stringify(newItem));
    });
    return;
  }

  if (req.method === "PUT" && req.url.startsWith("/items/")) {
    const id = Number(req.url.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const parsed = JSON.parse(body.replace(/^\uFEFF/, "") || "{}");
      const items = readData();
      const index = items.findIndex((i) => i.id === id);
      if (index === -1) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: "Elemento no encontrado" }));
      }
      if (parsed.name !== undefined && !parsed.name.trim()) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "El nombre no puede estar vacío" }));
      }
      items[index] = {
        ...items[index],
        ...(parsed.name ? { name: parsed.name.trim() } : {}),
        ...(parsed.status ? { status: parsed.status } : {}),
        updatedAt: formatDate()
      };
      writeData(items);
      res.writeHead(200);
      res.end(JSON.stringify(items[index]));
    });
    return;
  }

  if (req.method === "DELETE" && req.url.startsWith("/items/")) {
    const id = Number(req.url.split("/")[2]);
    const items = readData();
    const filtered = items.filter((i) => i.id !== id);
    if (filtered.length === items.length) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "Elemento no encontrado" }));
    }
    writeData(filtered);
    res.writeHead(200);
    return res.end(JSON.stringify({ deleted: id }));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Ruta no encontrada" }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor CRUD corriendo en http://localhost:${PORT}`);
});
