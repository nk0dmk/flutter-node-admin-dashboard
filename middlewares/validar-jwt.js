const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        console.log(`No token in request`);
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            console.log(`No user with uid: ${uid}`);
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if (!usuario.estado) {
            console.log(`User uid status: ${!usuario.estado} `);
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }


        req.usuario = usuario;
        next();

    } catch (error) {

        // console.log(error);
        console.log(`Token its not valid token: ${error}`);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}


module.exports = {
    validarJWT
}
