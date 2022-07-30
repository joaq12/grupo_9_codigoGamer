const db=require('../database/models');
const Op=db.Sequelize.Op;

module.exports={
    all:(req,res)=>{
        db.User
        .findAll({
            attributes:['id','name','email'],
            nest:true,
            raw:true,
        })
        .then(users=>{
            let result=users.map(user=>{
                return {
                    ...user,
                    detail:`http://localhost:3030/api/users/${user.id}`,
                    
                }
            })

            return res.json({
                count:users.length,
                users:result
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
            userAvatar:user.avatar
            })
        })
    }
}