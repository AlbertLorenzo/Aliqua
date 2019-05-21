const router = require('express').Router();

// Modelos
const Articles = require('../models/Article');

// Funciones extra
const returnJsonData = (data) => JSON.stringify(data);

// Rutas
router.get('/', async (req, res) => {
    const articlesData = await Articles.find({}, (err) => {
        if (err) {
            return console.error(err);
        }
    }).sort({date: -1});

    if (articlesData.length > 0) {
        const jsonData =  returnJsonData(articlesData);
        res.render('index', {
            jsonData
        });
    } else {
        res.send('Mantenimiento.');
    }
});

router.get('/videogames', async (req, res) => {
    const articlesData = await Articles.find({ category: 'videogames' }, (err) => {
        if (err) {
            return console.error(err);
        }
    });
    if (articlesData.length > 0) {
        const jsonData =  returnJsonData(articlesData);
        res.render('index', {
            jsonData
        });
    } else {
        res.send('Handle error');
    }
});

router.get('/technology', async (req, res) => {
    const articlesData = await Articles.find({ category: 'technology' }, (err) => {
        if (err) {
            return console.error(err);
        }
    });
    
    if (articlesData.length > 0) {
        const jsonData =  returnJsonData(articlesData);
        res.render('index', {
            jsonData
        });
    } else {
        res.send('Handle error');
    }
});

router.get('/music', async (req, res) => {
    const articlesData = await Articles.find({ category: 'music' }, (err) => {
        if (err) {
            return console.error(err);
        }
    });
    
    if (articlesData.length > 0) {
        const jsonData =  returnJsonData(articlesData);
        res.render('index', {
            jsonData
        });
    } else {
        res.send('Handle error');
    }
});

router.get('/culture', async (req, res) => {
    res.redirect('/');
});

module.exports = router;