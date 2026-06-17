import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { courses, FAQ_CONTEXT } from '@/data/courses';
import { rateLimit } from '@/utils/rateLimit';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per minute
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
    try {
      // Limit to 10 requests per minute per IP
      await limiter.check(10, ip);
    } catch {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const { messages } = await req.json();

    // Only keep the last 10 messages to save context limit and tokens
    const trimmedMessages = messages.slice(-10);

    const systemInstruction = `Eres un asistente virtual experto en programación y en la ruta de aprendizaje de desarrollo web de Víctor Robles. 
Tu objetivo es responder ÚNICAMENTE a preguntas relacionadas con el mundo de la programación, desarrollo web, inteligencia artificial, bases de datos, ciberseguridad, automatizaciones y sobre los cursos mencionados en la ruta de aprendizaje.
Si el usuario pregunta algo fuera de estos temas, debes responder amablemente que solo puedes ayudar con temas de programación y los cursos de la ruta de aprendizaje.

Contexto de los cursos y la ruta de aprendizaje:
${FAQ_CONTEXT}

Lista de cursos:
${courses.map((c, i) => `${i + 1}. ${c.title} (${c.rating} estrellas) - ${c.desc}`).join('\n')}
`;

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: systemInstruction,
      messages: trimmedMessages,
      temperature: 0.7,
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
