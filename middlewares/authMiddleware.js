function authMiddleware(res,req){
    if(req.session.userlogged != undefined){
        next()
    }elseres.render ("pagina solo para Usuarios")
};

module.exports = authMiddleware;