const { request, response } = require('express');
const path = require('path'); // para crear nuestras url
const { getConnection } = require('../database/database');
const { subirArchivo } = require('../helpers/subir-archivos');
const fs = require('fs');

const cargarArchivo = async (req = request, res = response) => {

  //preguntamos si en el request viene la propiedad file
  if (!req.files || Object.keys(req.files).length === 0) { //segundo verifica todos los archivos, si por lo menos encuentra una propiedad
    res.status(400).send({ msg: 'No hay archivos que subir.' });
    return;
  }

  if (!req.files.archivo) { //preguntamos que si o si venga el nombre del archivo se puede agregar arriba
    res.status(400).send({ msg: 'No hay archivos que subir.' });
    return;
  }
  /**
   * tener en cuenta que podremos enviar los files, las extensiones y la carpeta donde queremos que se ubiquen
   */
  const nombre = await subirArchivo(req.files, undefined, 'imagen');
  /**
   * Para subir otras extensiones y crear la carpeta
   */
  //const nombre = await subirArchivo(req.files, ['txt', 'csv'], 'archivos-txt');

  res.json({
    nombre: nombre
  })
}

const updateImage = async (req = request, res = response) => {

  const { tabla, id } = req.params;

  const tablaPermitidas = ['users', 'producto'];

  const incluida = tablaPermitidas.includes(tabla);

  if (!incluida) {
    res.status(400).json({
      ok: false,
      msg: `No existe la tabla: ${tabla} validas: ${tablaPermitidas}`
    })
  }

  try {
    const connection = await getConnection();
    switch (tabla) {
      case 'users':
        const user = await connection.query('SELECT id, avatar FROM users WHERE id = ?', id);
        const img = user[0].avatar;
        console.log("nombre imgen: " + img);
        if (img) {
          const pathImage = path.join(__dirname , '../uploads/images/' , tabla , img);
          console.log('entro');
          console.log(pathImage);
          if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
          }
        }
        if (user.length < 1) {
          res.status(400).json({
            ok: false,
            msg: `No existe el usuario con id: ${id}`
          })
        }



        const nombreImagen = await subirArchivo(req.files, ['png', 'jpg', 'gif', 'svg', 'jpng'], 'images/users');
        console.log(nombreImagen);
        await connection.query('Update users set avatar=? where id = ?', [nombreImagen, id]);
        console.log("ASDSGSAHRHRH")

        break;

      case 'producto':

        break;
    }

    res.status(200).json({
      ok: true,
      msg: 'Imagen actualizada con exito!'
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      error
    })
  }




}


module.exports = {
  cargarArchivo, updateImage
}