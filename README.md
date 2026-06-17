# DevRoute ChatBot - Asistente Virtual de Programación (Full-Stack Portafolio)

## Descripción
DevRoute ChatBot es una aplicación web Full-Stack diseñada para actuar como un asistente virtual experto en programación, desarrollo web y la ruta de aprendizaje de Víctor Robles. Utiliza el modelo `gpt-4o-mini` de OpenAI a través de **Vercel AI SDK**, ofreciendo respuestas en tiempo real mediante *streaming* y manteniendo una arquitectura moderna, rápida y segura construida con **Next.js 15 y React 19**.

## Objetivo
Como desarrollador, creé este proyecto para:

- Demostrar habilidades en la integración eficiente de modelos de Inteligencia Artificial (LLMs) en aplicaciones web utilizando el estándar **Vercel AI SDK**.
- Manejar flujos de datos asíncronos y respuestas en tiempo real (Server-Sent Events / Streaming) para brindar una excelente experiencia de usuario (UX).
- Diseñar prompts de sistema (*Prompt Engineering*) avanzados para inyectar contexto de datos propios (RAG ligero) y restringir temáticamente al bot, evitando usos indebidos de la IA.
- Implementar mecanismos de seguridad backend críticos como **Rate Limiting** para proteger las APIs de abusos y controlar el consumo de tokens.
- Mostrar dominio en el desarrollo frontend moderno utilizando **TypeScript**, animaciones con **Framer Motion**, y renderizado de texto enriquecido con **React Markdown**.

## Características
- **Chat en Tiempo Real con Streaming**: Experiencia fluida sin tiempos de carga prolongados, recibiendo las respuestas de la IA palabra por palabra gracias a la integración nativa de Next.js y el AI SDK.
- **Contexto Personalizado**: Inyección dinámica de preguntas frecuentes (FAQs) y catálogo de cursos en el prompt del sistema, permitiendo a la IA responder con información propietaria y específica.
- **Restricción Temática Estricta**: El asistente está rigurosamente programado para rechazar consultas fuera del ámbito de la programación, desarrollo web, bases de datos o IA, garantizando un enfoque profesional.
- **Seguridad y Optimización de Consumo**: 
  - Control de histórico de mensajes (trimming) para optimizar el límite de tokens y ahorrar costos en OpenAI.
  - Rate Limiting integrado en la ruta de la API para prevenir ataques DDoS y abuso de peticiones por IP.
- **Interfaz Interactiva**: Renderizado de código y formato Markdown en las respuestas, combinado con animaciones UI fluidas (Framer Motion) e iconos vectoriales (Lucide React).

## Tecnologías utilizadas
- **Frontend / Framework**: Next.js 15 (App Router), React 19.
- **Inteligencia Artificial**: Vercel AI SDK (`ai`), `@ai-sdk/openai`, OpenAI API (`gpt-4o-mini`).
- **Validación y Seguridad**: TypeScript estricto, Zod, Rate Limiting personalizado.
- **Estilizado y UI**: Global CSS / CSS Modules, Framer Motion, Lucide React, React Markdown.
- **Despliegue y Herramientas**: Entorno optimizado para Serverless (configurado en `vercel.json` y `next.config.js`).

## Estructura del proyecto
```
devroute-chatbot/
├── public/                 # Recursos estáticos
├── src/
│   ├── app/                # Enrutador principal de Next.js (App Router)
│   │   ├── api/chat/       # Route Handler backend para la comunicación con OpenAI
│   │   ├── globals.css     # Estilos globales y tokens
│   │   ├── layout.tsx      # Estructura principal y proveedores de contexto
│   │   └── page.tsx        # Interfaz principal del ChatBot
│   ├── components/         # Componentes UI reutilizables (chat, mensajes, inputs)
│   ├── context/            # Manejo de estado global con React Context
│   ├── data/               # Orígenes de datos estáticos (cursos, FAQs) inyectados a la IA
│   ├── hooks/              # Custom hooks para la gestión de la lógica del cliente
│   ├── types/              # Definiciones e interfaces de TypeScript
│   └── utils/              # Utilidades compartidas (ej. Rate Limiting, optimizaciones)
├── .env.example            # Plantilla de variables de entorno seguras
├── next.config.js          # Configuración del empaquetador de Next.js
├── package.json            # Dependencias del proyecto
└── vercel.json             # Reglas de despliegue y enrutamiento
```

## Habilidades demostradas
Este proyecto refleja competencias de un desarrollador Full-Stack especializado en el ecosistema React/Next.js y el desarrollo de software potenciado por IA:

- **Ingeniería con Inteligencia Artificial (Generative AI):** Capacidad de construir aplicaciones que consumen LLMs de forma responsable, dominando el estado de streaming y el diseño de prompts restrictivos.
- **Arquitectura Moderna de Frontend:** Estructuración limpia en Next.js App Router, separando claramente la lógica del cliente (Componentes, Hooks, Context) de la lógica del servidor (Route Handlers).
- **Protección de Infraestructura Cloud:** Comprensión profunda de cómo proteger un endpoint Serverless (Rate Limiting) y cómo gestionar eficientemente las llamadas externas para evitar sobrecostos (límite de historial y `maxDuration`).
- **Interfaces de Alta Calidad:** Creación de UI/UX pulidas que integran animaciones fluidas y parsing seguro de Markdown, demostrando atención al detalle.

## Notas para empleadores
Este proyecto fue diseñado con una mentalidad orientada al uso en producción y a la optimización de recursos. Con él busqué demostrar que:

- Puedo integrar y aprovechar ecosistemas modernos (como Vercel AI SDK) para crear productos de software innovadores de manera rápida y escalable.
- No solo me limito a "hacer funcionar" una API de IA, sino que entiendo sus implicaciones económicas y de seguridad, aplicando restricciones (*guardrails*) y limitadores de tasa (*rate limiters*).
- Soy capaz de crear interfaces modernas y atractivas, manteniendo un código tipado y estructurado listo para ser escalado por un equipo de trabajo.

Estoy 100% listo para aportar valor real en un equipo como Full-Stack Developer. Busco mi primera oportunidad profesional y ¡me encantaría trabajar contigo!

## Contacto
- **GitHub:** github.com/JesusBustos12
- **LinkedIn:** linkedin.com/in/jesus-bustos-arizmendi-325329283
- **Correo:** jesusbustosarizmendi0@gmail.com

¡Gracias por revisar mi trabajo! 🚀
