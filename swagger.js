const express = require("express");
const router = express.Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      description: "Documentation for my API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Article: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the article",
            },
            description: {
              type: "string",
              description: "A short description of the article",
            },
            content: {
              type: "string",
              description: "The full content of the article",
            },
            url: {
              type: "string",
              format: "url",
              description: "The URL of the article",
            },
            image: {
              type: "string",
              format: "url",
              description: "The URL of the article image",
            },
            publishedAt: {
              type: "string",
              format: "date-time",
              description: "The publication date and time of the article",
            },
            source: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "The name of the article source",
                },
                url: {
                  type: "string",
                  format: "url",
                  description: "The URL of the article source",
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/news.js"], // Path to your routes file
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve the Swagger API documentation
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerSpec));

module.exports = router;
