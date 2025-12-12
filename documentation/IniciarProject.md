# 🚀 Guía para arrancar el backend

## Modos de esquema
- **Migraciones (recomendado)**: `DB_SYNC=false`. El esquema se crea y actualiza solo con `npm run migration:*`. Ideal para producción y trabajo en equipo.
- **Synchronize rápido (solo local)**: `DB_SYNC=true`. TypeORM crea/ajusta tablas al arrancar. No mezclar con migraciones ni usar en producción.

## Preparación inicial (ambos modos)
1. Clonar el repo (o actualizar si ya lo tienes):
   ```bash
   git clone https://github.com/jfernand07/IOTSense.git
   ```
2. Entrar al backend e instalar dependencias:
   ```bash
   cd IOTSense/backend
   npm install
   ```
3. Crear `.env` en `backend/`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=postgres
   DB_NAME=iotsense
   DB_SYNC=false  # false = migraciones; true = sync solo en local
   ```
4. Crear la base de datos vacia (mismo nombre que `DB_NAME`):
   ```bash
   CREATE DATABASE iot_sense;
   ```

## Flujo recomendado: migraciones
1. Asegura `DB_SYNC=false` en `.env`.
2. Ejecutar migraciones existentes (crean tablas):
   ```bash
   npm run migration:run
   ```
3. Arrancar en desarrollo:
   ```bash
   npm run start:dev
   ```
4. (Opcional) Crear nuevas migraciones cuando cambies entidades:
   ```bash
   npm run migration:generate --name=create-tables
   npm run migration:run
   ```
5. Revertir la ultima migracion (solo si necesitas deshacer):
   ```bash
   npm run migration:revert
   ```

## Flujo rapido local: synchronize
1. Pon `DB_SYNC=true` en `.env`.
2. Arranca en desarrollo y TypeORM creara/ajustara las tablas al vuelo:
   ```bash
   npm run start:dev
   ```
3. No combines este modo con migraciones en la misma base de datos.

## Buenas practicas
- No edites migraciones ya ejecutadas; crea una nueva.
- Mantén `DB_SYNC` desactivado en staging/producción.
- Versiona todas las migraciones en Git.
