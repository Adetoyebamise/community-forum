const swaggerJsDocs = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { version } = require('../package.json')
require("dotenv").config({ path: __dirname + "/.env" });

const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'JOJOLO API DOCs' ,
            version,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
        server: [
            {
                url: process.env.SWAGGER
            }
        ]
    },
    apis: ['./Docs/routes/*/*.js', './Docs/schema/*.js']
};

const swaggerSpec = swaggerJsDocs(options)

//providing an endpoint to access the swagger specification
function swaggerDocs(app, port) {
    //swagger page
    app.use('/jojolo-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //Docs in JSON format
    app.get('/jojolo-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    })
    
    console.log(`Jojolo Swagger docs is available at https://jojolo.herokuapp.com/jojolo-docs`);
}

module.exports = swaggerDocs