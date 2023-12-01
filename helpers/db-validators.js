const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

const esRoleValido = async (rol = 'USER_ROLE') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        console.log('role exits');
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        console.log('email exists');
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
}

const existeUsuarioPorId = async (id) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        console.log(`user with ID: ${id} exists`);
        throw new Error(`El id no existe ${id}`);
    }
}

/**
 * Categorias
 */
const existeCategoriaPorId = async (id) => {

    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        console.log(`category with ID: ${id} NO exists`);        
        throw new Error(`El id no existe ${id}`);
    }
}

/**
 * Productos
 */
const existeProductoPorId = async (id) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        console.log(`product with ID: ${id} NO exists`);
        throw new Error(`El id no existe ${id}`);
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        console.log(`collection with name: ${coleccion} its NOT allowed.`);
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}

