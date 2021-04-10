const bancoService = require('../services/bancoService');

/**
 * Método para obtener las personas que cumplan con ciertos parametros de busqueda
 * @param {filters.rut_persona, filters.isDestinatario, filters.nombre_persona} filters 
 * @returns listado de personas
 */
async function getDestinatarios(filters){
    let where = "WHERE 1=1 ";
    
    if(filters && filters.rut_persona)
        where += "AND  rut_persona = '"+filters.rut_persona+"' ";
    if(filters && filters.nombre_persona)
        where += "AND  nombre_persona LIKE '%"+filters.nombre_persona+"%' ";
    if(filters && filters.tipo_cuenta){
        where += "AND  id_tipo_cuenta = "+filters.tipo_cuenta;
    }
    if(filters && filters.code_banco){
        const resultsBco = await bancoService.getBanco(filters.code_banco);
        where += "AND  id_banco = "+resultsBco[0].id_banco;
    }

    let query = 'SELECT * FROM public.persona ' + where;
    let result = await db.query(query);
    return result;
}

/**
 * 
 * @param {integer- rut identificador de una persona} rut 
 * @param {str- nombre persona} nombre 
 * @param {str- telefono } telefono 
 * @param {str- numero de cuenta} numero_cuenta 
 * @param {integer-  tipo de cuenta: 1 cta cte - 2 cta vista} tipo_cuenta 
 * @param {boolean - si es destinatario} isDestinatario 
 * @returns 
 */
async function createDestinatario(rut, nombre, telefono, numero_cuenta, tipo_cuenta, data_banco){
    const id_bco = await bancoService.createBanco(data_banco);
    let query = 'INSERT INTO public.persona(rut_persona, nombre_persona, telefono_persona, numero_cuenta, id_tipo_cuenta, id_banco)'+
    'VALUES ('+rut+', \''+nombre+'\', \''+telefono+'\', \''+numero_cuenta+'\', '+tipo_cuenta+', '+id_bco+');';
  
    let result = await db.query(query).then( function (res){console.log(res);});
    return result;
}

module.exports = {getDestinatarios, createDestinatario}