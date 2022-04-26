const productosController ={
    detail : (req, res) =>{
        res.render('product-detail');
    },
    cart:(req,res)=>{
        res.render('cart')
    } 
}


module.exports = productosController;