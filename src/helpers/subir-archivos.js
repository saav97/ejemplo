const path = require('path') // para crear nuestras url
const {v4: uuidv4} = require('uuid');

const subirArchivo=(files, extensionesPermitidas=['png', 'jpg', 'gif', 'jpeg'], carpeta = '')=>{
    return new Promise ((resolve, reject)=>{
        const {archivo} = files;
        const nombre_extension = archivo.name.split('.');
        const extension = nombre_extension[nombre_extension.length - 1];
        console.log(extension)

        //validar la extension

        if(!extensionesPermitidas.includes(extension)){
            return reject(`La extension ${extension} no es permitida. ${extensionesPermitidas}`);
        }

        const nombreTemporal = uuidv4() + '.' + extension;
        const uploadPath=path.join( __dirname, '../uploads', carpeta, nombreTemporal);

        archivo.mv(uploadPath, (err)=>{
            if(err){
                return reject(err);
            }

            resolve(nombreTemporal);
        })

    })
}


module.exports = {
    subirArchivo
}