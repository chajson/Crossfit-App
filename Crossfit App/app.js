const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exprsHandlebars = require('express-handlebars');
const exprsValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crossfitapp');
const db = mongoose.connction;
const Handlebars = require('handlebars');

const routes = require('./routes/index');
const users = require('./routes/users');

Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

//init app
const app = express();

//view engine 
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exprsHandlebars({
    defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

//BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({
    secret: 'secret',
    saveUnitialized: true,
    resave: true
}));

//Passport init 
app.use(passport.initialize());
app.use(passport.session());


//Express Validator
app.use(exprsValidator({
    errorFormatter: function (param, msg, value) {
        const namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Connect Flash
app.use(flash());

//Global consts
app.use(function(req ,res ,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.eroor_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', routes);
app.use('/users', users);


//Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'),function(){
   console.log('Server started on port '+app.get('port'));  
});





