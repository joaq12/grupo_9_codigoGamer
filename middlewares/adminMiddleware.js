function adminMiddleware(req,res,next){
    console.table(req.session.usuarioLogged)
    if(!(req.session.usuarioLogged.userType == "Administrador")){
        console.log("cliente intentando acceder")
         return res.render ("adminUser",{session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged})
    }else next()
};

module.exports = adminMiddleware;