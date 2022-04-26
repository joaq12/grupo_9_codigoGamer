
const mainController ={
    home : (req, res) =>{
        res.render('index')
    
    },
    store:(req,res)=>{
        res.render ('store');
    },
    contact: (req,res)=>{
        res.render ('contact');
    }
}


module.exports = mainController;