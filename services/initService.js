
async function init(){
    /* CREATE SCHEMA */
    await createSchema();
    await createTableBanco();
    await createTableTipoCuenta();
    await creatTableTransferencia();
    await createTablePersona();
    /* INSERT BASIC DATA */
    await insertTipoCuenta();
    return {result: 'ok'};
}

async function insertTipoCuenta(){
    let query = "INSERT INTO public.tipo_cuenta( id_cuenta, nombre_cuenta) VALUES (1, 'CUENTA CORRIENTE'),(2, 'CUENTA VISTA');";
    await db.query(query).catch(err => {});
}

async function createSchema(){
    await db.query("CREATE SCHEMA IF NOT EXISTS public;");
} 

async function createTableBanco(){
    await db.query("CREATE TABLE IF NOT EXISTS public.banco( id_banco integer NOT NULL, nombre_banco character varying(100) NOT NULL, code_banco character varying(10) NOT NULL, CONSTRAINT banco_pkey PRIMARY KEY (id_banco), CONSTRAINT uk_code_banco UNIQUE (code_banco));");
}

async function createTableTipoCuenta(){
    await db.query("CREATE TABLE IF NOT EXISTS public.tipo_cuenta(id_cuenta integer NOT NULL,nombre_cuenta character varying(50) NOT NULL, CONSTRAINT tipo_cuenta_pkey PRIMARY KEY (id_cuenta));")
}

async function createTablePersona(){
    let query = "CREATE TABLE IF NOT EXISTS public.persona ("+
    "   id_persona integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9999999 CACHE 1 ),"+
    "   rut_persona character varying(100) NOT NULL,"+
    "   nombre_persona character varying(500) NOT NULL,"+
    "   telefono_persona character varying(20) NOT NULL,"+
    "   numero_cuenta character varying(50) NOT NULL,"+
    "   id_tipo_cuenta integer NOT NULL,"+
    "   id_banco integer NOT NULL,"+
    "   CONSTRAINT pk_persona PRIMARY KEY (id_persona),"+
    "   CONSTRAINT uk_persona UNIQUE (id_persona) INCLUDE(rut_persona, id_tipo_cuenta, id_banco),"+
    "   CONSTRAINT fk_persona_banco FOREIGN KEY (id_banco)"+
    "       REFERENCES public.banco (id_banco) MATCH SIMPLE"+
    "        ON UPDATE NO ACTION"+
    "       ON DELETE NO ACTION"+
    "       NOT VALID,"+
    "   CONSTRAINT fk_persona_cuenta FOREIGN KEY (id_tipo_cuenta)"+
    "       REFERENCES public.tipo_cuenta (id_cuenta) MATCH SIMPLE"+
    "       ON UPDATE NO ACTION"+
    "       ON DELETE NO ACTION"+
    "       NOT VALID)";

    await db.query(query);
}

async function creatTableTransferencia() {
    let query = "CREATE TABLE  IF NOT EXISTS public.transferencia ( "+
    " id_transferencia integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9999999 CACHE 1 ), "+
    " monto_transferencia bigint NOT NULL,"+
    " id_persona integer NOT NULL,"+
    " CONSTRAINT pk_transferencia PRIMARY KEY (id_transferencia),"+
    " CONSTRAINT fk_transferencia_persona FOREIGN KEY (id_persona)"+
    "        REFERENCES public.persona (id_persona) MATCH SIMPLE"+
    "        ON UPDATE NO ACTION"+
    "        ON DELETE NO ACTION)";
    await db.query(query);
}

module.exports = {init}