function authMiddleware(req,res,next){
    if(req.session.usuarioLogged !== undefined){
        console.log("desde authMiddleware", req.session)
        next()
    }else return res.redirect ("/authUser")
};

module.exports = authMiddleware;