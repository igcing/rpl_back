const bancoService = require('../services/bancoService');

/**
 * Método para obtener las personas que cumplan con ciertos parametros de busqueda
 * @param {filters.rut_persona, filters.isDestinatario, filters.nombre_persona} filters 
 * @returns listado de personas
 */
async function getDestinatarios(filters){
        let where = "WHERE 1=1 ";
    
        if(filters && filters.rut_persona)
            where += " AND  p.rut_persona = '"+filters.rut_persona+"' ";
        if(filters && filters.nombre_persona)
            where += " AND  UPPER(p.nombre_persona) LIKE UPPER('%"+filters.nombre_persona.toUpperCase()+"%') ";
        if(filters && filters.tipo_cuenta)
            where += " AND  p.id_tipo_cuenta = "+filters.tipo_cuenta;
        if(filters && filters.numero_cuenta)
            where += " AND  p.numero_cuenta = '"+filters.numero_cuenta+"'";
        if(filters && filters.code_banco){
            const resultsBco = await bancoService.getBanco(filters.code_banco);
            where += " AND  p.id_banco = "+resultsBco[0].id_banco;
        }

        let query = 'select p.id_persona, p.rut_persona, UPPER(p.nombre_persona) nombre_persona, p.telefono_persona,p.numero_cuenta, UPPER(p.email_persona) email_persona, '+
        ' tc.id_cuenta, tc.nombre_cuenta as tipo_cuenta, b.code_banco, b.nombre_banco'+
        ' from persona p'+
        ' join tipo_cuenta tc on tc.id_cuenta = p.id_tipo_cuenta'+
        ' join banco b on b.id_banco = p.id_banco ' + where;
        let result = await db.query(query).catch( (error) => { throw(error) });
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
async function createDestinatario(rut, nombre, telefono, numero_cuenta, tipo_cuenta, email, code_banco, nombre_banco){
    const id_bco = await bancoService.createBanco(code_banco, nombre_banco);
    let query = 'INSERT INTO public.persona(rut_persona, nombre_persona, telefono_persona, numero_cuenta, id_tipo_cuenta, email_persona, id_banco)'+
    'VALUES ('+rut+', \''+nombre.toUpperCase()+'\', \''+telefono+'\', \''+numero_cuenta+'\', '+tipo_cuenta+',\''+email.toUpperCase()+'\', '+id_bco+');';
    await db.query(query).catch( (error) => { throw(error) });
    let search = await getDestinatarios({rut_persona:rut, tipo_cuenta: tipo_cuenta, code_banco: code_banco, nombre_banco: nombre_banco, numero_cuenta: numero_cuenta})
    return search;
}

module.exports = {getDestinatarios, createDestinatario}