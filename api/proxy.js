import fetch from 'node-fetch';

export default async function handler(req, res) {
  // define the allowed origins for incoming requests
  const allowedOrigins = [
    /^example\.com\/path1/, // regex for allowed path 1
    /^example\.com\/path2/  // regex for allowed path 2
  ];
  
  const origin = req.headers.origin; // get the origin header
  const referer = req.headers.referer; // get the referer header

  // check if the origin matches any allowed patterns
  const isAllowedOrigin = allowedOrigins.some(pattern => pattern.test(origin));
  // check if the referer matches any allowed patterns
  const isAllowedReferer = allowedOrigins.some(pattern => pattern.test(referer));

  // return 403 if origin or referer is not allowed
  if (!isAllowedOrigin || !isAllowedReferer) {
    return res.status(403).json({ error: 'COPE HARD' });
  }

  const { path } = req.query; // extract the path from the query

  // return 400 if path is missing
  if (!path) {
    return res.status(400).json({ error: 'bRUH moment' });
  }
  
  // define the allowed paths for requests
  const allowedPaths = [
    /^example\.com\/path1/, // regex for allowed path 1
    /^example\.com\/path2/  // regex for allowed path 2
  ];

  // check if the path matches any allowed patterns
  if (!allowedPaths.some(pattern => pattern.test(path))) {
    return res.status(403).json({ error: 'NOPE!!' });
  }

  // prevent access to local addresses
  if (/^(127\.0\.0\.1|localhost|::1)/.test(path)) {
    return res.status(403).json({ error: '?? loopback forbidden' });
  }

  const httpUrl = `http://${path}`; // construct the HTTP URL

  try {
    // fetch the data from the specified URL with a timeout
    const response = await fetch(httpUrl, { timeout: 5000 });

    // check if the response is okay (status in the range 200-299)
    if (!response.ok) {
      return res.status(response.status).json({ error: 'F' });
    }

    const contentType = response.headers.get('content-type'); // get the content type from response headers
    res.setHeader('Content-Type', contentType); // set the response content type
    res.status(response.status); // set the status code for the response
    
    response.body.pipe(res); // pipe the response body to the client
  } catch (error) {
    console.error('Fetch error:', error); // log any fetch errors
    res.status(500).json({ error: `F, ${error}` }); // return a generic error response
  }
}
