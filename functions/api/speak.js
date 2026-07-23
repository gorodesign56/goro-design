export async function onRequestPost(context) {
  const { text } = await context.request.json();
  const API_KEY = context.env.OPENAI_API_KEY;

  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini-tts',
      input: text,
      voice: 'shimmer',
      response_format: 'pcm'
    })
  });

  if (!response.ok) {
    return Response.json({ error: 'TTSエラー' }, { status: 500 });
  }

  return new Response(response.body, {
    headers: {
      'Content-Type': 'audio/pcm',
      'X-Sample-Rate': '24000',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
