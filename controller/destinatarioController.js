const express = require('express')
var router = express.Router();
const destinatarioService = require('../services/destinatarioService');
const ENDPOINT = require('../utils/constants').ENDPOINT_PERSONA;

const getDestinatarios = router.get(ENDPOINT, async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    const filters=req.query;
    const result =  await  destinatarioService.getDestinatarios(filters)
                    .then( (result) => {res.status(200).json(result)})
                    .catch((onrejected) => { console.log( onrejected ); return res.status(500).json(onrejected);});
    
});

const createDestinatario = router.post(ENDPOINT, async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    const body = req.body;
    const result = await destinatarioService.createDestinatario(body.rut_persona, body.nombre_persona, body.telefono_persona,
        body.numero_cuenta, body.tipo_cuenta, body.email_persona, body.code_banco, body.nombre_banco)
        .then( (result) => {return res.status(200).json(result)})
        .catch((onrejected) => { console.log( onrejected ); return res.status(500).json(onrejected);});
});

module.exports ={ getDestinatarios , createDestinatario};