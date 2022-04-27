const productosController ={
    detail : (req, res) =>{
        res.render('product-detail');
    },
    cart:(req,res)=>{
        res.render('cart')
    },
     
    checkoutAdress:(req,res)=>{
        res.render('checkout-adress')
    },

    checkoutConfirm:(req,res)=>{
        res.render('checkout-confirm')
    },

    checkoutData:(req,res)=>{
        res.render('checkout-data')
    },

    checkoutPayment:(req,res)=>{
        res.render('checkout-payment')
    },

    checkoutShipping:(req,res)=>{
        res.render('Checkout-shipping')
    },

    productUpload:(req,res)=>{
        res.render('product-upload-edit')
    },
}

module.exports = productosController;