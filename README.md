# http-to-https-proxy
This is an "proxy" to convert non-SSL content to SSL (to avoid the "mixed content" error on Chromium).

# Installation
Host your own instance at Vercel, pick your link and use the structure at [Usage](#usage).

Also, go to `api/proxy.js` and change the `allowedOrigins` and `allowedPaths` to match with your domains and what you want to retrieve with this API.

An example below:
```
const allowedOrigins = [
  /https?:\/\/(.*\.)?example\.com/,
  /https?:\/\/(.*\.)?example\.live/,
  /https?:\/\/(.*\.)?website\.live/
];

const allowedPaths = [
  /http?:\/\/(.*\.)?non-ssl\.com/,
];
```

If you don't want to include all subdomains, you can put their manually or just include the root domain to only allow itself.

Another example:
```
const allowedOrigins = [
  https://example.com/,
  https://example.live/,
  https://www.website.live/
];

const allowedPaths = [
  http://www.non-ssl.com/,
];
```

# Usage
This is an example link for an usage of the API:
```
https://proxy.example.com/api/proxy?path=www.non-ssl.com/non-ssl-img.png
```

- `https://proxy.example.com/api/proxy`: This is the path of the proxy. You will need to change the proxy domain to your real hosting domain address.
- `?path=www.non-ssl.com/non-ssl-img.png`: This is the path to the non-SSL resource that you want to convert to HTTPS. Don't put `http://` on the path, as the API already does this.

# Explaining API errors
My request returns an error with the content `COPE HARD`. What should I do?
- This is an `403 Forbidden` error. 99% chance you forgot to put your domain into `allowedOrigins`.

My requests to the API are just returning `F`. Why?
- This is any other error than a `403`. Try to see what is really wrong on `Chromium DevTools > Network` and see what is going wrong. More possibly an `ERR_BLOCKED_BY_ORB` error.

When I do something with the API, it returns a error with the content `bRUH moment`. Why? Am I dumb?
- Yes. You are running on an allowed domain, but you forgot to put your non-SSL content at `?path`, try that and see if it works.

# License 
BSD-3-Clause - 2024 Lucas Gabriel (lucmsilva)
