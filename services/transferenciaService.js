const destinatarioService = require('../services/destinatarioService');

async function getTransferencias(){
    let where = "WHERE 1=1 ";
    
    let query = 'select p.rut_persona, p.nombre_persona,tp.nombre_cuenta,t.monto_transferencia,b.code_banco,b.nombre_banco '+
                ' from public.transferencia t'+
                ' join public.persona p on t.id_persona = p.id_persona '+
                ' join public.tipo_cuenta tp on tp.id_cuenta = p.id_tipo_cuenta ' +
                ' join public.banco b on b.id_banco = p.id_banco '+ where;

    let result = await db.query(query);

    return result;
}
/**
 * Método para crear transferencia, se busca al destinatario
 * a partir de los datos enviados
 * @param {rut_persona, tipo_cuenta, code_banco, monto_trx} data_trx 
 * @returns ok
 */
async function createTransferencia(data_trx){
    const search_persona = await destinatarioService.getDestinatarios(
        {rut_persona: data_trx.id_persona_origen 
            , tipo_cuenta: data_trx.tipo_cuenta
            , code_banco: data_trx.code_banco});
    let query = "INSERT INTO public.transferencia(monto_transferencia, id_persona) "+
                " VALUES ("+data_trx.monto_transferencia+", "+search_persona[0].id_persona+");";
    await db.query(query);
    return {result: 'ok'};
}

module.exports = {getTransferencias, createTransferencia}