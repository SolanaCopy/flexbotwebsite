// Vercel Serverless Function: api/proxy.js
export default async function handler(req, res) {
  const { url } = req.query;
  const token = req.headers['auth-token'];

  if (!url) {
    return res.status(400).json({ error: 'Geen URL opgegeven' });
  }

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Server fout bij ophalen data' });
  }
}
















