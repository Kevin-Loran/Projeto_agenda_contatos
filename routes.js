const express = require("express");
const router = express.Router();

const homeControllers = require('./src/controllers/homeControllers');
const loginControllers = require('./src/controllers/loginControllers')
const contatoControllers = require('./src/controllers/contatoControllers')

const { loginRequired } = require('./src/middlewares/middlewares')

//Rotas da home 
router.get('/', homeControllers.index);


//Rotas de login
router.get('/login/index', loginControllers.index);
router.post('/login/register', loginControllers.register);
router.post('/login/login', loginControllers.login)
router.get('/login/logout', loginControllers.logout)

//Rotas de Contato
router.get('/contato/index', loginRequired, contatoControllers.index)
router.post('/contato/register', loginRequired, contatoControllers.register)
router.get('/contato/index/:id',loginRequired, contatoControllers.editIndex)
router.post('/contato/edit/:id', loginRequired,contatoControllers.edit)

router.get('/contato/delete/:id', loginRequired,contatoControllers.delete)
module.exports = router;