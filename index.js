const express = require('express')
var bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000
const routesInit = require('./controller/initController');
const routesDestinatario = require('./controller/destinatarioController');
const routesTransferencia = require('./controller/transferenciaController');
global.db = require('./dao/postgres').getDB();

express()
  //.use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .use(bodyParser.json())
  .use(routesDestinatario.createDestinatario)
  .use(routesTransferencia.createTransferencia)
  .use(routesTransferencia.getTransferencias)
  .get('/helloWorld',(req,res) => { res.send('hello world!')} )
  //.get('/getBank',  routesBank.getBank)
  .listen(PORT, () => {routesInit.initDB() ; console.log(`Listening on ${ PORT }`);})
