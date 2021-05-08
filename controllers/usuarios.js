const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    // const query = req.query;
    const { q, nombre = 'No name', apikey } = req.query;

    res.json({
        ok: true,
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
    })
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;
    res.status(201).json({
        ok: true,
        msg: 'post API - Controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {

    // const id = req.params.id;
    const { id } = req.params;
    res.json({
        ok: true,
        msg: 'put API - Controlador',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - Controlador'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - Controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}