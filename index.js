const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv')
const ConnectDB = require('./src/configs/database.configs')
const multer = require('multer');
const apiRouter = require('./src/routes/router')
const path = require('path')

dotenv.config()
ConnectDB()
const port = process.env.PORT || 3333;
const isProduction = process.env.NODE_ENV === "production";
const App = express()

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