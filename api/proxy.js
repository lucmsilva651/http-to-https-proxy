import fetch from 'node-fetch';

export default async function handler(req, res) {
  const allowedOrigins = [
    /https?:\/\/(.*\.)?lucmsilva\.com/,
    /https?:\/\/(.*\.)?eleu\.me/
  ];
  
  const origin = req.headers.origin;

  const isAllowedOrigin = allowedOrigins.some(pattern => pattern.test(origin));

  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    return res.status(403).json({ error: 'COPE HARD' });
  }

  const referer = req.headers.referer;
  
  const isAllowedReferer = allowedOrigins.some(pattern => pattern.test(referer));

  if (!isAllowedReferer) {
    return res.status(403).json({ error: 'COPE HARD' });
  }

  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: 'bRUH moment' });
  }

  const httpUrl = `http://${path}`;

  try {
    const response = await fetch(httpUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'F' });
    }

    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType);
    res.status(response.status);
    
    response.body.pipe(res);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'F' });
  }
}
