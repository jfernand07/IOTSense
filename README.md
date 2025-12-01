# IOTSense
Proyecto Final 


🌱 Proyecto IoT de Monitoreo de Plantas
Contexto
Construimos una solución IoT de extremo a extremo para el monitoreo de plantas. El sistema captura métricas ambientales mediante sensores físicos y las centraliza en la nube, donde un motor de análisis interpreta la salud del cultivo y almacena su historial.

Esta inteligencia alimenta una aplicación web moderna (NextJS) que sirve como centro de comando. Desde allí, técnicos y clientes pueden visualizar el estado actual mediante maquetas 3D, consultar el historial de datos y recibir recomendaciones automáticas, asegurando que cada planta reciba exactamente lo que necesita en el momento justo.

Objetivo general
Desarrollar un prototipo funcional de una plataforma IoT de monitoreo y diagnóstico inteligente, mediante la integración de sensores ambientales y una visualización 3D inmersiva, con el fin de proporcionar a los usuarios un panorama claro y estadístico para el cuidado personalizado de sus cultivos en ambientes controlados, promoviendo la optimización de recursos y la mejora de la productividad.

🔄 Flujo de datos complejos
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
Explicación del flujo:

Los sensores capturan datos del ambiente y del suelo.

El microcontrolador envía los datos a Arduino IoT Cloud.

El backend consume esos datos mediante la API oficial.

Los datos se procesan, se enriquecen y se guardan.

Los usuarios acceden a dashboards y a la vista 3D desde el frontend.

El sistema genera alertas y recomendaciones dependiendo de umbrales definidos.

⚙️ 1. Captura y Transmisión de Datos (IoT)
Esta es la capa donde se genera la materia prima (los datos) y se prepara para el procesamiento.

Sensores: Dispositivos físicos que miden variables críticas: Humedad del suelo y ambiental, Temperatura ambiente, Intensidad lumínica (Lux) y Nivel de CO₂.

Arduino/Microcontrolador: Actúa como Puerta de Enlace (Gateway). Se encarga de la lectura analógica/digital de los sensores, la normalización y el empaquetamiento de los datos en formato JSON antes de enviarlos a la nube.

Arduino IoT Cloud: Broker MQTT centralizado. Sirve como capa de persistencia temporal y punto de hook. Debe asegurar la telemetría y el acceso mediante API REST o WebHooks para que el backend pueda consumir los datos.

🧠 2. Procesamiento, Lógica y Persistencia (Backend NestJS)
Aquí el sistema se vuelve "inteligente".

Backend NestJS: Adaptador Primario para consumir datos de la IoT Cloud. Contiene el Motor de Reglas/Diagnóstico. Se encarga de: 1. Validar los datos, 2. Interpretar el estado de la planta (salud, etapa de crecimiento), y 3. Disparar alertas o recomendaciones

PostgreSQL: Adaptador Secundario que implementa el Repositorio de Datos. Almacena: Datos Crudos Históricos, Metadatos de la Planta/Ambiente (tipo, ubicación, edad) y Recomendaciones Generadas (fecha, estado, acción sugerida).

Lógica (Servicios de Dominio): El Corazón Inteligente. Aquí reside el código que aplica: a) Reglas Estáticas (ej. límites de temperatura) y b) Modelos Predictivos (ej. Machine Learning para predecir deficiencias nutricionales basadas en tendencias).

🖥️ 3. Presentación y Decisión (Frontend NextJS)
La capa que traduce la complejidad en valor accionable.

Frontend NextJS: Adaptador de Presentación. Se comunica con el Backend a través de API REST y WebSockets (para datos en tiempo real). Se encarga del renderizado eficiente y la gestión del estado de la interfaz.

Dashboards/Análisis: Visualización de Datos que incluye: Gráficos Históricos (tendencias), Indicadores Clave de Rendimiento (KPIs) y un Panel de Salud resumido para cada planta.

3D Mockup (Visual/Estético): Proporciona una Experiencia Inmersiva mostrando una representación esquemática del ambiente controlado, facilitando al usuario la ubicación de los sensores y la visualización intuitiva del estado general.

❓ Pregunta problematizadora
¿Se tiene previsto un flujo de control (actuadores) que devuelva comandos a los dispositivos IoT (ej. encender riego), o solo es un sistema de monitoreo pasivo?

🏗️ Arquitectura General Tecnológica
Frontend
NextJS
Dashboards, gráficos, gestión de usuarios
Integración 3D (React-Three-Fiber)
WebSockets en tiempo real
Backend
NestJS
Módulo para consumir Arduino IoT Cloud
Jobs para sincronizar lecturas
Autenticación JWT
Roles / Permisos
API REST
WebSockets
Base de Datos (PostgreSQL)
Entidades principales:

users
roles
plants
sensors
readings
alerts
recommendations
IoT Hardware
Arduino/ESP32
Sensores listados
Wifi
Lógica para enviar datos a Arduino IoT Cloud
