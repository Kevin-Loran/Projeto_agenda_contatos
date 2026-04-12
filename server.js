require('dotenv').config()

const express = require('express');
const app = express();

const mongoose = require('mongoose')

//conexão com a base de dados e priorizando a conexão com a base de dados
const connectionString = 'mongodb+srv://Kevin-Loran:kevin27533194@cluster0.wtgnvjh.mongodb.net/BASEDEDADOS?appName=Cluster0'
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log('conectei a base de dados..')
    
    app.listen(3000, () => {
      console.log('Acessar http://localhost:3000')
      console.log('Servidor executando na porta 3000')
    });
  })
  .catch(e => console.log(e))

const session = require('express-session');
const MongoStore = require('connect-mongo').default
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path')

const helmet = require('helmet')
const csrf = require('csurf')
const { middlewareGlobal, checkCsrfErro, CsrfMiddlewares } = require('./src/middlewares/middlewares');


app.use(helmet())

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
  secret: 'dsafsafsdfdagfsdgsagdgfdsagdsa',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING, collectionName: 'sessions' }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf())
// middlewareGlobal 
app.use(middlewareGlobal);
app.use(checkCsrfErro)
app.use(CsrfMiddlewares)
app.use(routes);
