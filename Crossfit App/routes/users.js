const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//Landing
router.get('/home', function (req, res) {
    res.render('home', {
        home: true
    });
});
//Register
router.get('/register', function (req, res) {
    res.render('register', {
        register: true
    });
});

//Login
router.get('/login', function (req, res) {
    res.render('login', {
        login: true
    });
});

router.get('/newOne', function (req, res) {
    res.render('newOne', {
        dashboard: true
    });
});

router.get('/update', function (req, res) {
    res.render('update', {
        dashboard: true
    });
});

router.get('/times', function (req, res) {
    res.render('times', {
        times: true
    });
});

router.get('/exercises', function (req, res) {
    res.render('exercises', {
        dashboard: true
    });
});


//Register User
router.post('/register', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;

    //Validation
    req.checkBody('username', 'Username is requierd').notEmpty();
    req.checkBody('password', 'Password is requierd').notEmpty();
    req.checkBody('password', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        let newUser = new User({
            username: username,
            password: password,
            wods: []
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
router.post('/NewWOD', function (req, res) {
    let user = req.user;
    let username = user.username;
    let name = req.body.item;


    User.findOne({
        username: username
    }).then(function (record) {
        record.wods.push({
            name: name,
            exercise: [],
            time: []
        });
        record.save();
    });
    req.flash('success_msg', 'Trening został dodany!');
    res.redirect('/users/dashboard');
});

//finding training 

router.get('/:id/addTime', function (req, res) {

    User.findOne({
        username: req.user.username
    }, function (err, foundUser) {

        let i = foundUser.wods.findIndex(function (wod) {
            return wod._id == req.params.id
        });
        res.render('addTime', {
            wod: foundUser.wods[i]
        });
    });
});
//finding training
router.get('/:id/addExercise', function (req, res) {

    User.findOne({
        username: req.user.username
    }, function (err, foundUser) {

        let i = foundUser.wods.findIndex(function (wod) {
            return wod._id == req.params.id
        });
        res.render('addExercise', {
            wod: foundUser.wods[i]
        });
    });
});

//adding exercise
router.post('/:id/exercise', function (req, res) {

    let exercise = req.body.exercise;

    User.findOne({
        username: req.user.username
    }, function (err, foundUser) {

        let i = foundUser.wods.findIndex(function (wod) {
            return wod._id == req.params.id
        });
        foundUser.wods[i].exercise.push(exercise);
        foundUser.save();
        req.flash('success_msg', 'Ćwiczenie zostało dodany!');
        res.redirect('/users/exercises');
    });
});
//adding time
router.post('/:id/time', function (req, res) {

    let time = req.body.time;

    User.findOne({
        username: req.user.username
    }, function (err, foundUser) {

        let i = foundUser.wods.findIndex(function (wod) {
            return wod._id == req.params.id
        });
        foundUser.wods[i].time.push(time);
        foundUser.save();
        req.flash('success_msg', 'Czas został dodany!');
        res.redirect('/users/dashboard');
    });
});

router.get('/:id/showProgress', function (req, res) {

    User.findOne({
        username: req.user.username
    }, function (err, foundUser) {

        let i = foundUser.wods.findIndex(function (wod) {
            return wod._id == req.params.id
        });
        res.render('showProgress', {
            wod: foundUser.wods[i]
        });
    });
});

module.exports = router;
