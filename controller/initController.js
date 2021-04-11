const initService = require('../services/initService');

async function initDB() {
    return await initService.init().then( () => {console.log('ok init')})
    .catch((onrejected) => { console.log( onrejected );});
};

module.exports ={ initDB };