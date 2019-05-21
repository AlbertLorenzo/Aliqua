const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error_msg', 'No autorizado.');
        res.redirect('/');
    }
};

module.exports = helpers; 