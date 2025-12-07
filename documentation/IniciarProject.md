# 🚀 Guía para arrancar el proyecto (Backend)

> Esta guía asume:
> - Node.js instalado (recomendado: LTS)
> - PostgreSQL instalado y corriendo
> - Estás en Linux/Mac/WSL o equivalente

---

## 1) Clonar el repositorio
```bash
git clone https://github.com/jfernand07/IOTSense.git
```

## 2) Entrar al backend e instalar dependencias

```bash
cd IOTSENSE/backend
npm install
```

## 3) Crear archivo de variables de entorno (.env)

```bash
# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=iot_sense
DB_SYNC=true
```

### Notas

- DB_SYNC=true hace que TypeORM cree/actualice tablas automáticamente en desarrollo. En producción normalmente se usa DB_SYNC=false y migraciones.

## 4) Crear la base de datos

En un gestor de base de datos usando el motor de postgres crea la DB con el mismo nombre que DB_NAME.

```bash
CREATE DATABASE iotsense;
```

## 5) Ejecutar el servidor (para que se creen las tablas)

```bash
npm run start:dev
```

### Validación rápida

- Si todo está bien deberías ver logs de TypeORM conectando a la DB y creando tablas (si DB_SYNC=true).

## Opcional

Una vez tienes las tablas creadas puedes poblar las tablas por medio de insert desde el gestor de base de datos o seguir **dataBase.md** y poblarlas usando herramientas como lo seria postman p thunder client
