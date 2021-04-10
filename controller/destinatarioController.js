const express = require('express')
var router = express.Router();
const destinatarioService = require('../services/destinatarioService');
const ENDPOINT = require('../utils/constants').ENDPOINT_PERSONA;

const getDestinatarios = router.get(ENDPOINT, async (req,res) => {
    console.log(req.query);
    const filters=req.query;
    const result =  await  destinatarioService.getDestinatarios(filters);
    return res.status(200).json(result);
});

const createDestinatario = router.post(ENDPOINT, async (req,res) => {
    const body = req.body;
    const result = await destinatarioService.createDestinatario(body.rut, body.nombre, body.telefono,
        body.numero_cuenta, body.tipo_cuenta, body.data_banco);
    return res.status(200).json(result);
});

module.exports ={ getDestinatarios , createDestinatario};