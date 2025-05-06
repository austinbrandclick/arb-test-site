export default async function handler(req, res) {
  const prompt = `Give a helpful 2-3 sentence overview for someone searching for laptops. Mention current deals or highlights specifically from Apple, Lenovo, and Dell. End with 'Here are the top results for laptops.'`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || '';
  res.status(200).json({ content });
}
