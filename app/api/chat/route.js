import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { messages, emotion } = await request.json();

  const systemPrompt = `You are a compassionate AI counselor specializing in anti-bullying support. 

Your goals:
1. Validate feelings - "That sounds really painful"  
2. Empathize deeply - "No one deserves that treatment"  
3. Ask gentle follow-up questions  
4. Offer practical strategies  
5. Know when to suggest professional help  
6. Stay supportive, never judgmental  

If user seems in crisis, provide hotline numbers. Keep responses warm and understanding.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
        { role: 'system', content: `User emotion context: ${emotion || 'neutral'}` }
      ],
      stream: true,
    });

    // Stream response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || '';
          controller.enqueue(encoder.encode(content));
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    return Response.json({ error: 'API error' }, { status: 500 });
  }
}
