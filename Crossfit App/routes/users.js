var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//Landing
router.get('/home', function (req, res) {
    res.render('home')
});
//Register
router.get('/register', function (req, res) {
    res.render('register');
});

//Login
router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/new', function (req, res) {
    res.render('new');
});

router.get('/update', function (req, res) {
    res.render('update');
});



//Register User
router.post('/register', function (req, res) {
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Validation
    req.checkBody('username', 'Username is requierd').notEmpty();
    req.checkBody('email', 'Email is requierd').notEmpty();
    req.checkBody('password', 'Password is requierd').notEmpty();
    req.checkBody('password', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newUser = new User({
            email: email,
            username: username,
            password: password
        });

        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'Zarejestrowano pomyślnie! Możesz się teraz zalogować');

        res.redirect('/users/login');
    }
});

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {
                    message: 'Nie ma takiego konta'
                });
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Złe hasło'
                    });
                }
            });
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    }),
    function (req, res) {
        res.redirect('/users/dashboard')

    });

router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success_msg', 'Wylogowano pomyślnie');

    res.redirect('/users/login');
});

//creating new training
const exercise = req.body.
router.post('/training', function(req, res){
   const exercise = req.body.item;

    
    
});
           

module.exports = router;
