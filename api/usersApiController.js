const db=require('../database/models');
const Op=db.Sequelize.Op;

module.exports={
    all:(req,res)=>{
        db.User
        .findAll({
            attributes:['id','name','email'],
            
        })
        .then(user=>{
            return res.json({
                userDetail:`/api/users/${user.id}`,
            count:user.length,
            users:user,
            
            })
        })
    },
    showUser:(req,res)=>{
        db.User
        .findByPk(req.params.id)
        .then(user=>{
            return res.json({
            userId:user.id,    
            userName:user.name,
            userLastName:user.lastName,
            userEmail:user.email,
            userBirthDay:user.bDate,
            userPhone:user.phone,
            avatarUrl:'http://localhost:3030/images/users/'+user.avatar
            
            })
        })
    }
}