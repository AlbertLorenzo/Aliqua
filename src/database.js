const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/articlesdb', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db => console.log('BBDD Conectada')).catch(err => console.log('Error' + err));