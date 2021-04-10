/**
 * Método para obtener o crear banco
 * @param {code_banco, nombre_banco} data_banco 
 * @returns id_banco
 */
async function createBanco(data_banco){
    let data_banco_founded = await getBanco(data_banco.code_banco);
    if(!data_banco_founded || data_banco_founded.length==0){
        let query = "INSERT INTO public.banco(code_banco, nombre_banco) VALUES ( '"+data_banco.code_banco+"', '"+data_banco.nombre_banco+"'); ";
        await db.query(query);
        data_banco_founded = await getBanco(data_banco.code_banco);
    }
    return data_banco_founded[0].id_banco;
}

/**
 * Método para obtener banco por codigo
 * @param {codigo de banco} code_banco 
 * @returns id_banco, code_banco, nombre_banco
 */
async function getBanco(code_banco){
    let query  = "SELECT * FROM public.banco WHERE code_banco ='"+code_banco+"'";
    const result = await db.query(query);
    return result;
}

module.exports = {createBanco , getBanco}