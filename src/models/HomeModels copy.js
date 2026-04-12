const mongoose = require('mongoose')

const HomeSchama = new mongoose.Schema({
    titulo: {type: String, require: true},
    descricao: String
});

const HomeModel = mongoose.model('Home',  HomeSchama);

module.exports = HomeModel