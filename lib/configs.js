module.exports = {
  META: {
    API_VERSION: process.env.API_VERSION,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  },
  WEB_SERVER: {
    PORT: process.env.PORT || 8080,
    ENV: process.env.NODE_ENV,
    ORIGIN:
      process.env.NODE_ENV === 'production'
        ? process.env.API_ORIGIN
        : 'http://localhost:8080',
  },
};
