const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 5000
const routesInit = require('./controller/initController');
const routesDestinatario = require('./controller/destinatarioController');
const routesTransferencia = require('./controller/transferenciaController');
global.db = require('./dao/postgres').getDB();

express()
  .use(cors())
  .use(bodyParser.json())
  .use(routesDestinatario.createDestinatario)
  .use(routesTransferencia.createTransferencia)
  .use(routesTransferencia.getTransferencias)
  .get('/init', async (req,res) => { 
      res.send( await routesInit.initDB()
                      .then( () => { return {result: 'ok'}})
                      .catch( () => { return {result: 'error'}})
              )
  })
  .listen(PORT, () => {routesInit.initDB() ; console.log(`Listening on ${ PORT }`);})
