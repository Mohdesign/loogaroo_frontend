// next.config.js
const nextTranslate = require('next-translate');

module.exports = {
   ...nextTranslate(),
   images: {
      domains: ['localhost:1337','res.cloudinary.com'],
    },
};
 