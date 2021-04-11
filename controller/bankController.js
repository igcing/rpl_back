const express = require('express')
var router = express.Router();
const bankService = require('../services/bankService');

const getBank = router.get('/getBank', async (req,res) => {
    const result =  await  bankService.getBank()
                        .then( (result) => {res.status(200).json(result)})
                        .catch((onrejected) => { console.log( onrejected ); return res.status(500).json(onrejected);});
});

module.exports ={ getBank };