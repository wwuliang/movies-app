module.exports = {
  env: {
    apiKey: process.env.API_KEY,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiKey: process.env.API_KEY, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiKey: process.env.API_KEY,
  },

  images: {
    domains: ['image.tmdb.org'], // Add 'image.tmdb.org' to the list of allowed image domains
  },
}