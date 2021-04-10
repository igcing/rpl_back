const express = require('express')
var router = express.Router();
const bankService = require('../services/bankService');

const getBank = router.get('/getBank', async (req,res) => {
    const result =  await  bankService.getBank()  ;
    return res.status(200).json(result);
});

module.exports ={ getBank };