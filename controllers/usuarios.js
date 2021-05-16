const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    // const query = req.query;
    // const { q, nombre = 'No name', apikey } = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    // Se reemplaza con promise all

    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        // ok: true,
        // msg: 'get API - Controlador',
        // q,
        // nombre,
        // apikey
        total,
        usuarios
        // resp
    })
}

const usuariosPost = async (req, res = response) => {



    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    // const body = req.body;

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    // Guardar en la Base de Datos
    await usuario.save();
    res.json({
        ok: true,
        msg: 'post API - Controlador',
        usuario
    })
}

const usuariosPut = async (req, res = response) => {

    // const id = req.params.id;
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        // ok: true,
        // msg: 'put API - Controlador',
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - Controlador'
    })
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    // Eliminar cambiando el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    res.json({
        ok: true,
        msg: 'delete API - Controlador',
        id,
        usuario
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}