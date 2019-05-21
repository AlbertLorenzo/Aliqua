// Requests
const path = require('path');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const exSession = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
const express = require('express');

// Inicializaciones
const app = express();
require('./database');
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 288);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(exSession({
    secret: 'qx4',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((e, req, res, next) => {
    if (e.message === "Bad request") {
        res.status(400).json({error: {msg: e.message, stack: e.stack}});
    }
});

// Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.log_succeed = req.flash('log_succeed');
    res.locals.log_out = req.flash('log_out');
    next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/articles'));
app.use(require('./routes/users'));

// Ficheros estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Inicio de servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en puerto: ' + app.get('port'));
});