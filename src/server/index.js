const express = require('express')
const routes = require('../routes')
const server = express()

const swagger = require('swagger-express-router')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const middlewareObj = {} // TODO
const options = {
  explorer: true,
  apis: ['./routes/*.js']
}
const useBasePath = true
swagger.setUpRoutes(middlewareObj, swaggerDocument, useBasePath)
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
routes.get('/api-docs', swaggerUi.setup(swaggerDocument))
routes.use('/api-docs', swaggerUi.serve)

server.use(express.json())
server.use('/api', routes)

module.exports = server
