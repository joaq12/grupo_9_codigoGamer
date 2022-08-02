function uDetailMiddleware(req,res,next){
    if(!(req.session.usuarioLogged.userType == "Administrador") && (!(req.session.usuarioLogged.id == req.params.id))){
        console.log("cliente intentando acceder")
         return res.render ("adminUser",{session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged})
    }else next()
};

module.exports = uDetailMiddleware;