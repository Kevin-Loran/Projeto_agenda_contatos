import validator from 'validator'

export default class Contato {
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }

    init(){
        this.events()
    }

    events(){
        if(!this.form)return
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e)
        })
    }

    validate(e){
        const el = e.target;
        const nome = el.querySelector('input[name="nome"]');
        const sobrenome= el.querySelector('input[name="sobrenome"]');
        const email = el.querySelector('input[name="email"]');
        const telefone = el.querySelector('input[name="telefone"]');
        let error = false;

        if(!nome.value){
            alert('o campo "nome" é obrigatorio')
            error = true;
        }

        if(!email.value && !validator.isEmail(email.value)){
            alert('Email inválido');
            error = true;
        }

        if(email.value && !telefone.value){
            alert('Preencha ao menos o campo "telefone" ou "email".')
            error = true
        }

        if(!error) el.submit()

        console.log(nome.value, sobrenome.value, email.value, telefone.value)
    }
}