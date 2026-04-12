const Contato = require('../models/contatoModel')


exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    })
}

exports.register = async(req, res) => {
    try{
        const contato = new Contato(req.body)
        await contato.register();
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/index'))
            return
        }
    
         req.flash('success', 'seu contato foi criado com sucesso')
         req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
         return

    }catch(e){
        console.log(e)
        res.render('404')
    }

}

exports.editIndex = async(req,res) => {
    if(!req.params.id) return res.render('404')

    const contato = await Contato.buscarPorId(req.params.id)

    if(!contato) return res.render('404');
    
    res.render('contato', {contato});
};

exports.edit = async(req, res) => {
    try{
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id)  

        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/index'))
            return 
        }
        
        req.flash('success', 'seu contato foi editado com sucesso')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return

    }catch(e){
        console.log(e);
        res.render('404');
    }
    
};

exports.delete = async(req, res)  => {

    if(!req.params.id) return res.render('404')

    const contato = await Contato.delete(req.params.id)
    if(!contato) return res.render('404');

    req.flash('success', 'seu contato foi apagado com sucesso')
    req.session.save(() => res.redirect(`/`))
    return
};