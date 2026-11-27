# CRUD Git Flow - Programación III

API CRUD sencilla en **Node.js** con persistencia local en `data.json` y flujo de trabajo **Git Flow** (`main`, `dev`, `qa`, ramas `feature/*` y `hotfix/*`).

## Requisitos
- Tener **Node.js** instalado (`node -v`).

## Cómo ejecutar el servidor
1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta:
   ```bash
   node server.js





   

##  ---------------------------------------------------------------------------------------------------------------------- 

   Endpoint y métodos disponibles
URL base: http://localhost:3000/items

GET /items: Lista todos los elementos almacenados en data.json.
POST /items: Crea un nuevo elemento. Requiere name (obligatorio, texto no vacío) y acepta status (opcional; si no se envía, usa "pendiente").
PUT /items/:id: Actualiza un elemento existente por su id (name y/o status).
DELETE /items/:id: Elimina un elemento existente por su id.

## Cómo probar el CRUD (GET, POST, PUT, DELETE) --------------------------------------------------------------------------
En PowerShell (otra terminal abierta)

PowerShell
# 1. GET - Listar elementos actuales
Invoke-RestMethod -Uri "http://localhost:3000/items" -Method Get

# 2. POST - Crear un elemento (name obligatorio, status opcional)
$item = Invoke-RestMethod -Uri "http://localhost:3000/items" -Method Post -ContentType "application/json" -Body '{"name":"Revisar entrega","status":"pendiente"}'
$item

# 3. PUT - Actualizar elemento por id
Invoke-RestMethod -Uri "http://localhost:3000/items/$($item.id)" -Method Put -ContentType "application/json" -Body '{"status":"completado"}'

# 4. DELETE - Eliminar elemento por id
Invoke-RestMethod -Uri "http://localhost:3000/items/$($item.id)" -Method Delete

# 5. GET - Verificar estado final en data.json
Invoke-RestMethod -Uri "http://localhost:3000/items" -Method Get
