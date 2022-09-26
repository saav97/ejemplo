const {getConnection} = require('./../database/database');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */


const getProducts = async(req, res)=>{
    try {
        const connection = await getConnection();

        const result = await connection.query("SELECT id_producto, nombre, cantidad, precio, costo FROM producto");
        
        res.status(200).json({
            ok:true,
            result
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
   
}

const addProduct = async (req, res)=>{
    const {nombre, precio,costo, cantidad } = req.body

    const producto ={
        nombre,
        precio,
        costo,
        cantidad
    }
    try {
        const connection = await getConnection();

        const result = await connection.query("INSERT INTO producto SET ?", producto);
    
        res.status(200).json({
            ok:true,
            result,
            message:'Producto agregado con exito!!'
        }); 
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:error
        })
    }  
}

const editProducto = async(req, res)=>{
    const id = req.params.id
    console.log(id);
    try {
        
        const productoActualizado = req.body

        const connection = await getConnection();

        const idProducto = await connection.query("SELECT id_producto FROM producto WHERE id_producto = ?",id);

        if(idProducto.length<1){
            return res.status(404).json({
                ok:false,
                message: 'El producto no existe'
            });        
        }

        const result = await connection.query("UPDATE producto set ? WHERE id_producto=?",[productoActualizado,id]);

        res.status(200).json({
            ok:true,
            result,
            msg:'Producto Actualizado'

        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
    
}

module.exports={
    getProducts,
    addProduct,
    editProducto
}