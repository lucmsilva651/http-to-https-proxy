# http-to-https-proxy
This is an "proxy" to convert non-SSL content to SSL (to avoid the "mixed content" error on Chromium).

# Installation
Host your own instance at Vercel, pick your link and use the structure at [Usage](#usage).

Also, go to `api/proxy.js` and change the `allowedOrigins` to match with the domain you want to use with this API.

An example below:
```
const allowedOrigins = [
  /https?:\/\/(.*\.)?example\.com/,
  /https?:\/\/(.*\.)?example\.live/,
  /https?:\/\/(.*\.)?website\.live/
];
```

# Usage
```
https://proxy.example.com/api/proxy?path=www.non-ssl.com/non-ssl-img.png
```
- You will need to change the `proxy.example.com` to your real proxy domain address (like `ssl.lucmsilva.com`).
- Also, you will need to change `www.non-ssl.com` and forward with the URL of the resource that you want to convert to HTTPS.

# License 
BSD-3-Clause - 2024 Lucas Gabriel (lucmsilva)