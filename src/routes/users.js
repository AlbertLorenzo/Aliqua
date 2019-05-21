const router = require('express').Router();
const passport = require('passport');

// Modulos
const User = require('../models/User');

router.post('/users/signin', passport.authenticate('local'), async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }, (err, res) => {
        if (err) {
            next();
        };
        return res.name;
    });
    res.send(user.name);
});

router.post('/users/signup', async (req, res) => {
    const {
        email,
        name,
        password
    } = req.body;

    if (!email || !name || !password) {
        res.send('No se pudo crear el usuario. Uno o más campos están vacíos.');
    } else {
        const emailExists = await User.findOne({
            email: email
        });
        if (emailExists) {
            res.send('El correo introducido ya está registrado.');
        } else {
            const newUser = new User({
                name,
                email,
                password
            });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            res.send('userCreated');
        }
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;