const {getConnection} = require('../database/database');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/JWT');

const login = async(req, res)=>{
    /**
     * en el login enviamos el usuario y contraseña
     */
    const {username, password} = req.body;

    try {

        console.log(username);
        const connection = await getConnection();
        const resultado = await connection.query('SELECT id, password FROM users where username = ?',username);


        console.log(resultado[0]);
        //comparar password
        if(resultado.length < 1){
            return res.status(404).json({
                ok:false,
                error:'Datos incorrectos'
            })
        }

        console.log(resultado[0].password)

        //si encontramos el usuario validamos la password
        const validPassword = bcrypt.compareSync(password,(resultado[0].password));
        console.log(validPassword);
        if(!validPassword){
            return res.status(404).json({
                ok:false,
                error:'Contraseña incorrecta'
            })
        }
        
        //si existe el usuario y la password es correcta generamos el token

        console.log(resultado[0].id);
        const token = await generarJWT(resultado[0].id)

        res.status(200).json({
            ok:true,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: error.message
        })
    }

}

module.exports = {
    login
}