const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


// Configure Swagger API documentation
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API Cooking App",
            version: "1.0.0",
            description: "API documentation for the Cooking App",
        },
        servers: [
            {
                url: "http://localhost:3001", // Corrected key from `server` to `servers`
                description: "Local API Server",
            },
        ],
    },
    apis: ["./routes/*.js"], // Fixed path
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Swagger Docs available at http://localhost:${port}/api-docs`);
}

module.exports = swaggerDocs;
