export default async function handler(req, res) {
  const prompt = `Write a helpful 2-3 sentence overview for someone searching for laptops. Highlight any sales, promos, or features from Dell, Apple, and Lenovo laptops. End with: "Here are the top results for laptops."`;

  try {
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
    const content = data?.choices?.[0]?.message?.content?.trim();

    res.status(200).json({
      content: content || "Looking for a new laptop? Dell, Apple, and Lenovo are currently offering great deals on popular models. Here are the top results for laptops."
    });

  } catch (err) {
    console.error('OpenAI API Error:', err);
    res.status(500).json({
      content: "Here are the top results for laptops."
    });
  }
}
