const initService = require('../services/initService');

async function initDB() {
    return await initService.init();
};

module.exports ={ initDB };