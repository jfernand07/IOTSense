# IOTSense
Proyecto Final

## 🌱 Proyecto IoT de Monitoreo de Plantas

### Contexto
Construimos una solución IoT de extremo a extremo para el monitoreo de plantas.  
El sistema captura métricas ambientales mediante sensores físicos y las centraliza en la nube, donde un motor de análisis interpreta la salud del cultivo y almacena su historial.

Esta inteligencia alimenta una aplicación web moderna (**NextJS**) que sirve como centro de comando.  
Desde allí, técnicos y clientes pueden:
- Visualizar el estado actual mediante maquetas 3D
- Consultar el historial de datos
- Recibir recomendaciones automáticas

Todo esto asegura que cada planta reciba exactamente lo que necesita en el momento justo.

---

### 🎯 Objetivo general
Desarrollar un prototipo funcional de una plataforma IoT de monitoreo y diagnóstico inteligente, mediante la integración de sensores ambientales y una visualización 3D inmersiva.  
El fin es proporcionar a los usuarios un panorama claro y estadístico para el cuidado personalizado de sus cultivos en ambientes controlados, promoviendo la optimización de recursos y la mejora de la productividad.

---

## 🔄 Flujo de datos complejos
```
[Sensores Físicos] 
      ↓ 
[Microcontrolador (Arduino/ESP32)]
      ↓ 
[Arduino IoT Cloud]
      ↓ (API REST)
[Backend NestJS]
      ↓
[Lógica: alertas, reglas, análisis]
      ↓
[Base de Datos PostgreSQL]
      ↓
[Frontend NextJS + Panel 3D]
```

### Explicación del flujo
- Los sensores capturan datos del ambiente y del suelo.  
- El microcontrolador envía los datos a **Arduino IoT Cloud**.  
- El backend consume esos datos mediante la API oficial.  
- Los datos se procesan, se enriquecen y se guardan.  
- Los usuarios acceden a dashboards y a la vista 3D desde el frontend.  
- El sistema genera alertas y recomendaciones dependiendo de umbrales definidos.  

---

## ⚙️ 1. Captura y Transmisión de Datos (IoT)

**Sensores:**  
- Humedad del suelo y ambiental  
- Temperatura ambiente  
- Intensidad lumínica (Lux)  
- Nivel de CO₂  

**Arduino/Microcontrolador:**  
- Actúa como *Gateway*  
- Lectura analógica/digital de sensores  
- Normalización y empaquetamiento de datos en JSON  
- Envío a la nube  

**Arduino IoT Cloud:**  
- Broker MQTT centralizado  
- Persistencia temporal y punto de hook  
- Telemetría y acceso mediante API REST o WebHooks  

---

## 🧠 2. Procesamiento, Lógica y Persistencia (Backend NestJS)

**Backend NestJS:**  
- Adaptador primario para consumir datos de IoT Cloud  
- Motor de reglas/diagnóstico  
- Funciones principales:  
  1. Validar datos  
  2. Interpretar estado de la planta (salud, etapa de crecimiento)  
  3. Disparar alertas o recomendaciones  

**PostgreSQL:**  
- Adaptador secundario  
- Almacena:  
  - Datos crudos históricos  
  - Metadatos de planta/ambiente (tipo, ubicación, edad)  
  - Recomendaciones generadas (fecha, estado, acción sugerida)  

**Lógica (Servicios de Dominio):**  
- Reglas estáticas (ej. límites de temperatura)  
- Modelos predictivos (ej. ML para deficiencias nutricionales)  

---

## 🖥️ 3. Presentación y Decisión (Frontend NextJS)

**Frontend NextJS:**  
- Adaptador de presentación  
- Comunicación con backend vía API REST y WebSockets  
- Renderizado eficiente y gestión de estado  

**Dashboards/Análisis:**  
- Gráficos históricos (tendencias)  
- KPIs  
- Panel de salud resumido por planta  

**3D Mockup:**  
- Experiencia inmersiva  
- Representación esquemática del ambiente controlado  
- Visualización intuitiva del estado general  

---

## ❓ Pregunta problematizadora
¿Se tiene previsto un flujo de control (actuadores) que devuelva comandos a los dispositivos IoT (ej. encender riego), o solo es un sistema de monitoreo pasivo?

---

## 🏗️ Arquitectura General Tecnológica

### Frontend
- NextJS  
- Dashboards, gráficos, gestión de usuarios  
- Integración 3D (React-Three-Fiber)  
- WebSockets en tiempo real  

### Backend
- NestJS  
- Módulo para consumir Arduino IoT Cloud  
- Jobs para sincronizar lecturas  
- Autenticación JWT  
- Roles / Permisos  
- API REST  
- WebSockets  

### Base de Datos (PostgreSQL)
**Entidades principales:**  
- users  
- roles  
- plants  
- sensors  
- readings  
- alerts  
- recommendations  

### IoT Hardware
- Arduino/ESP32  
- Sensores listados  
- Wifi  
- Lógica para enviar datos a Arduino IoT Cloud  

