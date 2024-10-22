import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  const httpUrl = `http://${path}`;
  try {
    const response = await fetch(httpUrl);
    const contentType = response.headers.get('content-type');

    res.setHeader('Content-Type', contentType);
    res.status(response.status);

    // Pipe the response to the client
    response.body.pipe(res);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch the resource' });
  }
}
