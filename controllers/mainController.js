const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
var products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = require('../database/models');
const Product = require("../database/models/Product");


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController ={
    inicio : (req, res) =>{
        res.render("index")
    },

    home : (req, res) =>{
        console.log(req.session.usuarioLogged)
        db.Category.findAll()
            .then(category =>{
                    res.render ('home', { category, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged} );
            })
    },

    storeByCategory:(req,res)=>{
        db.Category.findByPk(req.params.id, {include:{association:"product"}})
            .then(category =>{
                console.log(category)
                res.render ('store', { category, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged} );
            })
    },

    
    
    contact: (req,res)=>{
        res.render ('contact',{session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
    },
}


module.exports = mainController;