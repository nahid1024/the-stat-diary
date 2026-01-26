export default [
  'strapi::logger',
  'strapi::errors',
  //'strapi::security',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", , 'localhost'],
          'img-src': ["'self'", 'data:', 'blob:', 'localhost'],
          'media-src': ["'self'", 'data:', 'blob:', 'localhost'],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://the-stat-diary.vercel.app/', 'http://localhost:3000'], // Specify your allowed origins
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'], // Allow required methods
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'], // Include required headers
      credentials: true, // If your frontend sends cookies/credentials
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
