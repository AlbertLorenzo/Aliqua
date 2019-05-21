const router = require('express').Router();

// Modelos
const Articles = require('../models/Article');
const { isAuthenticated } = require('../helpers/out');

// Rutas
router.get('/articles/add', isAuthenticated, (req, res) => {
    res.render('articles/new-article');
});

router.post('/articles/new-article', isAuthenticated, async (req, res, next) => {
    const {
        title,
        author,
        routeImg,
        lead,
        category,
        body
    } = req.body;

    if (!title || !author || !routeImg || !lead || !category || !body) {
        res.render('articles/new-article', {
            errors: 'Uno o más campos están vacíos, no se ha podido enviar!'
        });
    } else {
        const newArticle = new Articles(req.body);
        newArticle.user = req.user.id;
        await newArticle.save((err) => {
            if (err) {
                return err
            };
        });
        req.flash('success_msg', 'Artículo creado correctamente!');
        res.redirect('/articles');
    }
});

router.get('/articles', isAuthenticated, async (req, res) => {
    const articles = await Articles.find({user: req.user.id}).sort({
        date: 'asc'
    });
    res.render('articles/all-articles', {
        articles
    });
});

router.get('/articles/edit/:id', isAuthenticated, async (req, res) => {
    const article = await Articles.findById(req.params.id);
    const articleJSON = JSON.stringify(article);
    res.render('articles/edit-article', {
        article,
        articleJSON
    });
});

router.put('/articles/edit-article/:id', isAuthenticated, async (req, res) => {
    console.log(req.body);
    const {
        title,
        lead,
        routeImg,
        category,
        body
    } = req.body;
    await Articles.findByIdAndUpdate(req.params.id, {
        title,
        lead,
        routeImg,
        category,
        body
    });
    req.flash('success_msg', 'Artículo editado correctamente!');
    res.redirect('/articles');
});

router.delete('/articles/delete/:id', isAuthenticated, async (req, res) => {
    await Articles.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Artículo eliminado correctamente!');
    res.redirect('/articles');
});

router.get('/article/:id', async (req, res) => {
    const id = req.params.id;
    const articleData = await Articles.findById({
        _id: id
    }, (err) => {
        if (err) return console.error(err);
    });

    const jsonData = JSON.stringify(articleData);
    res.render('article', {
        jsonData
    });
});

module.exports = router;