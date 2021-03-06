var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/users/dashboard', ensureAuthenticated, function(req, res){
   res.render('dashboard',  {dashboard: true}); 

});

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        
            res.redirect('/users/home');
        }
    
    }


module.exports = router;