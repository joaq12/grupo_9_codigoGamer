function ghuestMiddleware(res,req){
    if(req.session.userlogged == undefined){
        next()
    }elseres.render ("pagina solo para Invitados")
};

module.exports = ghuestMiddleware;