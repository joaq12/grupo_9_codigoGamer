const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
var products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController ={
    home : (req, res) =>{
        console.log(req.session)
        res.render("index", {session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
    
    },
    store:(req,res)=>{
        res.render ('store', {session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged, products} );
    },
    
    contact: (req,res)=>{
        res.render ('contact',{session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
    },

    prueba: (req,res)=>{
        res.render ('prueba',{session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
    },
}


module.exports = mainController;