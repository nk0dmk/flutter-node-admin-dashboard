const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers');

const getUsuarioPorId = async (req = request, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findById(id);

    res.json(usuario);
}


const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    console.log(req.body);
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    });


    // try {
    //     const existsMail = await Usuario.findOne({ correo: correo }).exec();
    //     console.log(`existe email: ${existsMail}`);
    //     if (existsMail == null) {
    //         console.log('El usuario ya existe.');
    //         return res.status(400).json({
    //             ok: false,
    //             msg: 'El mail ya está registrado'
    //         });
    //     }

    //     const user = new Usuario({ nombre, correo, password, rol });
    //     // Encriptar contraseña
    //     const salt = bcryptjs.genSaltSync();
    //     user.password = bcryptjs.hashSync(password, salt);

    //     // Guardar user 
    //     await user.save();

    //     // Obtener toke JWT
    //     const token = await generarJWT(user.id);

    //     res.json({
    //         ok: true,
    //         user,
    //         token,
    //     });

    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Error inesperado',
    //     });
    // }
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        isUpdated: 'ok',
        usuario
    });
    // res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    getUsuarioPorId
}
