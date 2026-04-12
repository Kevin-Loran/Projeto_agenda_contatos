const contato = require('../models/contatoModel')

exports.index = async (req, res) => {
    const contatos = await contato.buscaContato();
    res.render('index', { contatos })
};

