/**
 * Método para obtener o crear banco
 * @param {code_banco, nombre_banco} data_banco 
 * @returns id_banco
 */
async function createBanco(code_banco, nombre_banco){
    let data_banco_founded = await getBanco(code_banco);
    if(data_banco_founded.length==0){
        let query = "INSERT INTO public.banco(code_banco, nombre_banco) VALUES ( '"+code_banco+"', '"+nombre_banco+"'); ";
        await db.query(query).catch( (error) => { throw(error) });
        data_banco_founded = await getBanco(code_banco);
    }
    return data_banco_founded[0].id_banco;
}

/**
 * Método para obtener banco por codigo
 * @param {codigo de banco} code_banco 
 * @returns id_banco, code_banco, nombre_banco
 */
async function getBanco(code_banco){
    let query  = "select * from banco where code_banco ='"+code_banco+"'";
    return await db.query(query).catch( (error) => { throw(error) });
}

module.exports = {createBanco , getBanco}