# Crear archivo .env

## Instrucciones

El archivo `.env` está protegido por seguridad, pero puedes crearlo manualmente siguiendo estos pasos:

### Opción 1: Copiar desde el template

```bash
cd backend
copy env.template .env
```

### Opción 2: Crear manualmente

Crea un archivo llamado `.env` en la carpeta `backend/` con el siguiente contenido:

```env
# ============================================
# CONFIGURACIÓN DE BASE DE DATOS POSTGRESQL
# ============================================
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=iotsense
DB_SYNC=false

# ============================================
# CONFIGURACIÓN DE MONGODB
# ============================================
# URI completa de MongoDB Atlas (Recomendado)
MONGO_URI=mongodb+srv://Testuser:LOmpY4J2ETai0iq2@proyectoiot.bxycbvf.mongodb.net/iotsense?retryWrites=true&w=majority

# ============================================
# CONFIGURACIÓN DE JWT (AUTENTICACIÓN)
# ============================================
JWT_SECRET=iotsense-secret-key-change-in-production-min-32-characters-long
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN_DAYS=7

# ============================================
# CONFIGURACIÓN DE OPENAI (IA)
# ============================================
OPENAI_API_KEY=your-openai-api-key-here

# ============================================
# CONFIGURACIÓN DEL SERVIDOR
# ============================================
PORT=3002
FRONTEND_URL=http://localhost:3000
```

## Variables a configurar

### PostgreSQL (Base de datos relacional)
- `DB_HOST`: Host de PostgreSQL (default: localhost)
- `DB_PORT`: Puerto de PostgreSQL (default: 5432)
- `DB_USER`: Usuario de PostgreSQL
- `DB_PASS`: Contraseña de PostgreSQL
- `DB_NAME`: Nombre de la base de datos
- `DB_SYNC`: Sincronización automática (false en producción)

### MongoDB (Base de datos NoSQL)
- `MONGO_URI`: URI completa de MongoDB Atlas (recomendado)
  - O usar variables individuales:
    - `MONGO_HOST`: Host de MongoDB
    - `MONGO_PORT`: Puerto de MongoDB (solo para local)
    - `MONGO_DATABASE`: Nombre de la base de datos
    - `MONGO_USERNAME`: Usuario de MongoDB
    - `MONGO_PASSWORD`: Contraseña de MongoDB

### JWT (Autenticación)
- `JWT_SECRET`: Secreto para firmar tokens (cambiar en producción)
- `JWT_EXPIRES_IN`: Tiempo de expiración del token de acceso (default: 15m)
- `JWT_REFRESH_EXPIRES_IN_DAYS`: Días de expiración del refresh token (default: 7)

### OpenAI (IA)
- `OPENAI_API_KEY`: API key de OpenAI para el servicio de IA

### Servidor
- `PORT`: Puerto del servidor (default: 3002)
- `FRONTEND_URL`: URL del frontend para CORS (default: http://localhost:3000)

## Notas importantes

1. **Nunca subas el archivo `.env` a Git** - Ya está en `.gitignore`
2. **Cambia el `JWT_SECRET` en producción** - Usa un valor seguro y aleatorio
3. **Para MongoDB Atlas**: Asegúrate de agregar tu IP a la whitelist
4. **Para PostgreSQL**: Asegúrate de que la base de datos esté creada

