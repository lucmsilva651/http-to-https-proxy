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

If you don't want to include all subdomains, you can put their manually or just include the root domain to only allow itself.

Another example:
```
const allowedOrigins = [
  https://subdomain.example.com/,
  https://example.live/
];
```

# Usage
```
https://proxy.example.com/api/proxy?path=www.non-ssl.com/non-ssl-img.png
```
- You will need to change the `proxy.example.com` to your real proxy domain address (like `ssl.lucmsilva.com`).
- Also, you will need to change `www.non-ssl.com` and forward with the URL of the resource that you want to convert to HTTPS.

# Explaining API errors
My request returns an error with the content `COPE HARD`. What should I do?
- This is an 403 Forbidden error. 99% chance you forgot to put your website into `allowedOrigins`.

My requests to the API are just returning `F`. Why?
- This is any other error than a 403. Try to see what is really wrong on `Chromium DevTools > Network` and see what is going wrong. More possibly an `ERR_BLOCKED_BY_ORB` error.

When I do something with the API, it returns a error with the content `bRUH moment`. Why? Am I dumb?
- Yes. You are running on an allowed domain, but you forgot to put your non-SSL content at `?path`, try that and see if it works.

# License 
BSD-3-Clause - 2024 Lucas Gabriel (lucmsilva)