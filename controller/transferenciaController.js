const express = require('express')
var router = express.Router();
const transferenciaService = require('../services/transferenciaService');
const ENDPOINT = require('../utils/constants').ENDPOINT_TRANSFERENCIA;

const getTransferencias = router.get(ENDPOINT, async (req,res) => {
    console.log(req.query);
    const filters=req.query;
    const result =  await  transferenciaService.getTransferencias();
    return res.status(200).json(result);
});

const createTransferencia = router.post(ENDPOINT, async (req,res) => {
    const data_trx = req.body;
    const result = await transferenciaService.createTransferencia(data_trx);
    return res.status(200).json(result);
});

module.exports ={ getTransferencias , createTransferencia};