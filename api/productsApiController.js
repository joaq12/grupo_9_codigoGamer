const db=require('../database/models');
const Op=db.Sequelize.Op;
const sequelize=require('sequelize');
const usersApiController = require('./usersApiController');


module.exports={
    all:async (req,res)=>{
        try {
            let products=await db.Product.findAll({include:{association:"category"},
                 raw:true})
            let categories= await db.Category.findAll({include:{association:"product"},nest:true,})     
            let result={
                count:products.length,
                countByCategory:categories.map(({name,product})=>({ [name]:product.length})),
                products
            }
            res.send(result);     
        } catch (error) {
            console.log(error)
            return res.send('error')
        }

        //db.Product
    //     .findAll({include:{association:"category"},
    //     raw:true,
    //     nest:false
    //               })
    //     .then(products=>{
    //      const resultado= products.map(product=>{
    //         return{
                
    //             ...product,
    //             details:`http://localhost:3030/api/products/${product.id}`,
                
    //         }
            
    //     })
        
    //     res.send(resultado); 
    // })
},
    countByCategory:(req,res)=>{
        db.Category
        .findAll({include:{association:"product"},nest:true,})
        .then(categories=>{
            return res.json(categories);
            return res.json(categories.map(({name,product,id})=>{
                return{
                    [name]:product.length
    
                }
            }))
        })
    },
    showProduct:(req,res)=>{
        db.Product
        .findByPk(req.params.id)
        .then(product=>{
            return res.json({
            data:product
            })
        })
    }
}

