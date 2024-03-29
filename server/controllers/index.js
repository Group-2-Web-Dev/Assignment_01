let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias


module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', displayName: req.user ? req.user.displaName : ''});
};

// module.exports.displayAboutPage = (req, res, next) => {
//     res.render('index', { title: 'About', displayName: req.user ? req.user.displaName : ''});
// };

// module.exports.displayProductsPage = (req, res, next) => {
//     res.render('index', { title: 'Products', displayName: req.user ? req.user.displaName : ''});
// };

// module.exports.displayServicesPage = (req, res, next) => {
//     res.render('index', { title: 'Services', displayName: req.user ? req.user.displaName : ''});
// };

// module.exports.displayContactPage = (req, res, next) => {
//     res.render('index', { title: 'Contact Us', displayName: req.user ? req.user.displaName : ''});
// };

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
};

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //server err?
        if(err)
        {
            return next(err);
        }
        // if there is a user login err?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server err?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/incident-list');
        });
    })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displaName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
};

module.exports.processRegisterPage = async (req, res, next) => {
    try
    {
        const existingUser = await User.findOne(
            { 
                email: req.body.email 
            });

        // If a user with email already exists, return an error
        if (existingUser) 
        {
            req.flash(
                'registerMessage', 
                'Registration Error: Email already in use!');

            return res.render('auth/register', 
            {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displaName : ''
            });
        }
        else 
        {
            // instantiate an user object
            let newUser = new User({
                username: req.body.username,
                email: req.body.email,
                displayName: req.body.displayName
            });

            User.register(newUser, req.body.password, (err) => {
                if(err)
                {
                    console.log(err);
                    console.log("Error: Inserting New User");
                    if(err.name == "UserExistsError")
                    {
                        req.flash(
                            'registerMessage',
                            'Registation Error: User Already Exists!'
                        );
                        console.log('Error: User Already Exists!');
                    }
                    return res.render('auth/register',
                    {
                        title: "Register",
                        messages: req.flash('registerMessage'),
                        displayName: req.user ? req.user.displaName : ''
                    });
                }
                else
                {
                    // if registration is successful
                    return passport.authenticate('local')(req, res, () => {
                        res.redirect('/incident-list')
                    });
                }
            });
        }
    }
    catch (err) 
    {
        console.log(err);
        return next(err);
    }
};

module.exports.performLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            //handle error here
            console.log(err);
            return next(err);
        }
        return res.redirect('/');
    });
}