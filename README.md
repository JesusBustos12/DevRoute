# DevRoute - Plataforma Educativa y Asistente Virtual AI

## Descripción
DevRoute es una plataforma web Full-Stack diseñada para centralizar cursos de programación y desarrollo web, potenciada por un asistente virtual integrado. Utiliza el modelo `gpt-4o-mini` de OpenAI mediante el **Vercel AI SDK**, ofreciendo respuestas en tiempo real (*streaming*). La aplicación cuenta con una arquitectura robusta, segura y altamente optimizada, construida sobre **Next.js 15, React 19, Prisma ORM y TiDBCloud**.

## Arquitectura y Tecnologías
- **Frontend**: Next.js 15 (App Router), React 19.
- **Inteligencia Artificial**: Vercel AI SDK (`ai`), `@ai-sdk/openai`, OpenAI API.
- **Base de Datos y ORM**: TiDBCloud (Serverless MySQL) administrado a través de Prisma ORM.
- **Estilizado e UI**: CSS Modules, Framer Motion (animaciones fluidas), Lucide React, Next/Image.
- **Infraestructura**: Vercel (Serverless Functions).

## Características Principales
- **Asistente de IA con Streaming**: Experiencia conversacional en tiempo real sin latencias perceptibles de carga, renderizando respuestas progresivamente y soportando sintaxis Markdown.
- **Contexto RAG Ligero**: Inyección dinámica del catálogo de cursos e información propietaria directamente en el prompt del sistema.
- **Seguridad y Control de Abusos**: Implementación de un limitador de peticiones (Rate Limiter) basado en direcciones IP almacenado en TiDBCloud, bloqueando abusos de uso de la IA e integrando reinicios automáticos controlados por el servidor.
- **Restricciones de Dominio**: El asistente incluye *guardrails* estrictos para rechazar de manera segura consultas fuera del ámbito de la programación, desarrollo web o bases de datos.
- **Optimización de Recursos (Assets)**: Compresión masiva de imágenes a formato `.webp` y uso del componente de imágenes optimizadas de Next.js, logrando métricas Core Web Vitals excelentes.
- **Interfaz Reactiva**: Soporte de modo claro/oscuro (ThemeToggle), indicadores dinámicos del estado de peticiones de la IA (Badges UI) e interacciones animadas.

## Ingeniería y Decisiones Técnicas
- **Gestión de Conexiones Serverless**: Implementación del patrón *Singleton* para el cliente de Prisma, previniendo el agotamiento del pool de conexiones en entornos Serverless como Vercel.
- **Conexiones Seguras TLS**: Configuración estricta de transporte seguro (`sslaccept=strict`) para las comunicaciones con la base de datos distribuida de TiDBCloud.
- **Optimización de Consumo LLM**: Aplicación de técnicas de recorte de historial (*context trimming*) para maximizar la ventana de tokens sin sobrecostos en la facturación de OpenAI.
- **Arquitectura Limpia**: Separación de responsabilidades mediante Next.js App Router, aislando estrictamente la lógica del cliente (Hooks, Context) de la capa del servidor (Route Handlers, validación y acceso a base de datos).

## Estructura del Proyecto
```text
devroute-chatbot/
├── prisma/                 # Esquema de base de datos (Prisma Schema) y migraciones
├── public/                 # Recursos estáticos optimizados (.webp, .png)
├── src/
│   ├── app/                # Enrutador principal de Next.js (Server Components & API Routes)
│   │   └── api/chat/       # Endpoints de OpenAI y validación de Rate Limiting en DB
│   ├── components/         # Componentes UI reutilizables (Chatbot, ThemeToggle, Header)
│   ├── context/            # Context API para el manejo de estado global (Dark/Light Theme)
│   ├── data/               # Catálogos inyectados dinámicamente
│   └── lib/                # Utilidades de infraestructura (Instancia de Prisma Client)
├── .env.example            # Plantilla de variables de entorno
├── next.config.ts          # Configuración estricta del empaquetador de Next.js
└── package.json            # Dependencias del proyecto
```

## Contacto
- **GitHub:** [JesusBustos12](https://github.com/JesusBustos12)
- **LinkedIn:** [Jesús Bustos Arizmendi](https://linkedin.com/in/jesus-bustos-arizmendi-325329283)
- **Correo:** jesusbustosarizmendi0@gmail.com
