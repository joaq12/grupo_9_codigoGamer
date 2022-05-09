const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
var products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//const arrayCat = products.filter(products => products.catg === catg)
//const //arrayMonitores = products.filter(products => products.catg === "monitores")
//const //arrayParlantes = products.filter(products => products.catg === "parlantes")
//const //arrayCoolers = products.filter(products => products.catg === "coolers")



const mainController ={
    home : (req, res) =>{
        res.render("index");
    
    },
    store:(req,res)=>{
        res.render ('store',{products});
    },
    contact: (req,res)=>{
        res.render ('contact');
    }

}


module.exports = mainController;