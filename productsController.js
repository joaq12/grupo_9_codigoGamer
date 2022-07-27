const db=require('../database/models');
const Op=db.Sequelize.Op;

module.exports={
    all:(req,res)=>{
        db.Product
        .findAll({include:{association:"category"}})
        .then(products=>{
            return res.json({
            count:products.length,
            products:products,
            detailsUrl:'http://localhost:3030/product-detail/'+products.id 
            })
        })
    },
    countByCategory:(req,res)=>{
        db.Category
        .findAll({include:{association:"product"}})
        .then(categories=>{
            return res.json({
               totalCategories:categories.length,
               categories:categories, 
            })
        })
    },
    showProduct:(req,res)=>{
        db.Product
        .findByPk(req.params.id)
        .then(product=>{
            return res.json({
            data:product,
            img1:'http://localhost:3030/images/'+product.photo1,
            img2:'http://localhost:3030/images/'+product.photo2,
            img3:'http://localhost:3030/images/'+product.photo3
            })
        })
    }
}

