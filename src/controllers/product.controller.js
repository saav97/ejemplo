const getConnection = require('./../database/database');

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
            error
        })
    }
   
}

const addProduct = async (req, res)=>{
    console.log(req.body);
    const {nombre, precio,costo, cantidad } = req.body

    const producto ={
        nombre,
        precio,
        costo,
        cantidad
    }
    console.log(producto);
    try {
        const connection = await getConnection();

        const result = await connection.query("INSERT INTO producto SET ?", producto);
    
        res.status(200).json({
            ok:true,
            message:'Producto agregado con exito!!'
        }); 
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:error
        })
    }
    
}

module.exports={
    getProducts,
    addProduct
}