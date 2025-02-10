import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Marknotes REST API',
      version: '1.0.0',
      description: 'API documentation with Marknotes',
    },
  },
  apis: ['./src/routes/**/*.ts'], // 放置你的 API 路由文件的目录
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
