import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { courses, FAQ_CONTEXT } from '@/data/courses';
import { prisma } from '@/lib/prisma';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
    const MAX_REQUESTS = 20;

    // Lógica de Rate Limiting en Prisma (24h reset)
    let rateLimit = await prisma.userRateLimit.findUnique({ where: { ip } });
    
    if (rateLimit) {
      const now = new Date();
      const lastUpdate = new Date(rateLimit.updatedAt);
      const hoursDiff = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);

      if (hoursDiff >= 24) {
        // Reset after 24 hours
        rateLimit = await prisma.userRateLimit.update({
          where: { ip },
          data: { requestCount: 1, updatedAt: new Date() }
        });
      } else {
        if (rateLimit.requestCount >= MAX_REQUESTS) {
          return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
        }
        // Increment count
        rateLimit = await prisma.userRateLimit.update({
          where: { ip },
          data: { requestCount: { increment: 1 }, updatedAt: new Date() }
        });
      }
    } else {
      // Create new record
      rateLimit = await prisma.userRateLimit.create({
        data: { ip, requestCount: 1 }
      });
    }

    const { messages, sessionId } = await req.json();

    if (sessionId) {
      const session = await prisma.chatSession.findUnique({ where: { id: sessionId } });
      if (!session) {
        await prisma.chatSession.create({
          data: { id: sessionId, user_identifier: ip }
        });
      }

      const lastUserMessage = messages[messages.length - 1];
      if (lastUserMessage && lastUserMessage.role === 'user') {
        await prisma.message.create({
          data: {
            session_id: sessionId,
            role: 'user',
            content: lastUserMessage.content
          }
        });
      }
    }

    // Only keep the last 10 messages to save context limit and tokens
    const trimmedMessages = messages.slice(-10);

    const dbCourses = await prisma.course.findMany({
      select: { title: true, rating: true, description: true }
    });
    
    const coursesListText = dbCourses.length > 0 
      ? dbCourses.map((c, i) => `${i + 1}. ${c.title} (${c.rating} estrellas) - ${c.description}`).join('\n')
      : courses.map((c, i) => `${i + 1}. ${c.title} (${c.rating} estrellas) - ${c.desc}`).join('\n');

    const systemInstruction = `Eres un asistente virtual experto en programación y en la ruta de aprendizaje de desarrollo web de Víctor Robles. 
Tu objetivo es ayudar a los usuarios con cualquier duda sobre el mundo de la programación, lenguajes, herramientas (ej. Docker, jQuery, React, etc.), desarrollo web, inteligencia artificial, bases de datos, ciberseguridad, automatizaciones y sobre los cursos de la ruta de aprendizaje.

Reglas importantes:
1. Si el usuario te pregunta sobre una tecnología de programación (ej. Docker, jQuery) debes reconocer que es un tema válido de programación y puedes darle una breve respuesta técnica útil. NUNCA digas que es un tema ajeno a la programación.
2. Si preguntan si existe un curso sobre una tecnología que NO está en la "Lista de cursos", responde aclarando que es una gran tecnología, pero que por el momento no hay un curso específico de eso en el catálogo actual de Víctor Robles. Ofrécele alternativas de la lista si aplica.
3. Si el usuario pregunta de temas COMPLETAMENTE ajenos a la tecnología o programación (ej. cocina, política, deportes), entonces sí responde amablemente que solo puedes ayudar con temas de programación y los cursos de la ruta de aprendizaje.

Contexto de los cursos y la ruta de aprendizaje:
${FAQ_CONTEXT}

Lista de cursos:
${coursesListText}
`;

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: systemInstruction,
      messages: trimmedMessages,
      temperature: 0.7,
      onFinish: async ({ text }) => {
        if (sessionId) {
          try {
            await prisma.message.create({
              data: {
                session_id: sessionId,
                role: 'assistant',
                content: text
              }
            });
          } catch (e) {
            console.error('Error saving assistant message:', e);
          }
        }
      }
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
