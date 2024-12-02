const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Delivery App API',
      version: '1.0.0',
      description: 'API для управления заказами, продуктами, пользователями и ресторанами.',
    },
    servers: [
      { url: 'http://localhost:5000' }, 
    ],
  },
  apis: ['./routes/*js'], // Путь к вашим файлам с маршрутами
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
