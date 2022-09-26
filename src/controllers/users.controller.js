const {getConnection} = require('./../database/database');
const {request, response} = require('express')

const bcrypt = require('bcryptjs');

const getUsers = async(req = request, res=response)=>{
    try {

        const connection = await getConnection();

        const resultado = await connection.query('SELECT username, password, avatar, role, email FROM users')

        return res.status(200).json({
            ok:true,
            resultado
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: error.message
        }
        )
    }
}

const addUser = async(req, res)=>{
    try {
        const {username, password, avatar, role, email} = req.body;
        const usuario = {
            username,
            password,
            avatar,
            role,
            email
        }

        //encriptar la password:
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        const connection = await getConnection();
        const sql = 'INSERT INTO users set ?';
        const resultado = await connection.query(sql,usuario);

        return res.status(200).json({
            ok:true,
            msg:'Usuario creado con exito'
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
}

module.exports = {
    getUsers,
    addUser
}