function ghuestMiddleware(req,res,next){
    if(req.session.usuarioLogged === undefined){
        next()
    }else  return res.render ("ghestUser",{session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged})
};

module.exports = ghuestMiddleware;