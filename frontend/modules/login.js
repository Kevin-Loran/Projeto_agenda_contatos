import validator from 'validator'

export default class Login {
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
        const email = el.querySelector('input[name="email"]');
        const password = el.querySelector('input[name="password"]');
        let error = false;

        if(!validator.isEmail(email.value)){
            alert('Email inválido');
            error = true;
        }

        if(!password.value){
            alert('Campo senha não preenchido')
            error = true
        }else if(password.value.length < 3 || password.value.length > 50) {
            alert('Senha precisa só pode ter entre 3 há 50 caracteres.');
            error = true;
        }

        if(!error) el.submit()

        console.log(email.value, password.value)
    }
}