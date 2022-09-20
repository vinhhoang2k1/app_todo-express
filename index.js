const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv')
const ConnectDB = require('./src/configs/database.configs')
const apiRouter = require('./src/routes/router')
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "App_todo api",
            version: "1.0.0",
            description: "A simple Express Library API"
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: {
            // basicAuth: [],
            // apiKey: []
            bearerAuth: []
        },
        servers: [
            {
                url: "http://localhost:3333/"
            },
        ]
    },
    //   apis: ["./routes/*.js"]
    apis: ["./src/routes/*.js"]
}

dotenv.config()
ConnectDB()
const port = process.env.PORT || 3333;
const isProduction = process.env.NODE_ENV === "production";
const specs = swaggerJsDoc(options);
const App = express()

App.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
App.use(
    isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev")
);
App.use(cors());
App.use(helmet())
App.use(express.json());


App.use('/api', apiRouter)

App.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

App.use('/image', express.static('resources/static/assets/uploads/'))

App.get("*", (req, res) => {
    res.json({
        message: "Api not found",
    });
});

// App.use("*",);

App.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});