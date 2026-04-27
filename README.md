# Agenda de Contatos

Este projeto é uma aplicação web fullstack para gerenciamento de contatos pessoais. Foi o primeiro projeto que desenvolvi do zero com Node.js e Express, aplicando conceitos de autenticação, segurança, MVC e deploy em produção na Google Cloud.

A parte que mais me desafiou foi o deploy configurar Nginx, PM2 e resolver os problemas com Webpack e bundle em produção foi onde aprendi de verdade.

Acesse a aplicação rodando: http://34.95.208.101

A aplicação está hospedada em uma VM no Google Cloud Compute Engine (Ubuntu 22.04, região São Paulo), com PM2 gerenciando o processo Node.js e Nginx como reverse proxy na porta 80.

---

## O que a aplicação faz

- Cadastro e login de usuários com senha criptografada
- Sessão persistente com expiração de 7 dias
- Criar, visualizar, editar e deletar contatos
- Cada contato armazena nome, sobrenome, e-mail e telefone
- Validação de dados tanto no frontend quanto no backend
- Proteção CSRF em todos os formulários
- Mensagens de feedback para o usuário em cada ação
- Página 404 personalizada

---

## Tecnologias utilizadas

### Backend

- Node.js com Express 5
- MongoDB Atlas como banco de dados na nuvem
- Mongoose para modelagem dos dados
- express-session com connect-mongo para sessões persistentes
- bcryptjs para criptografia de senhas
- csurf para proteção contra CSRF
- helmet para headers de segurança HTTP
- connect-flash para mensagens entre requisições
- dotenv para variáveis de ambiente
- EJS como template engine

### Frontend

- Webpack 4 com Babel para empacotamento e transpilação
- Bootstrap 5 para estilização
- validator.js para validação nos formulários

### Infraestrutura

- Google Cloud Compute Engine com VM Ubuntu 22.04 na região de São Paulo
- PM2 para gerenciar o processo e reiniciar automaticamente
- Nginx como reverse proxy da porta 80 para a porta 3000

---

## Estrutura do projeto

O projeto segue o padrão MVC:

```
ProjetoAgenda/
├── src/
│   ├── controllers/
│   │   ├── homeControllers.js
│   │   ├── loginControllers.js
│   │   └── contatoControllers.js
│   ├── models/
│   │   ├── loginModel.js
│   │   └── contatoModel.js
│   ├── middlewares/
│   │   └── middlewares.js
│   └── views/
│       ├── index.ejs
│       ├── contato.ejs
│       ├── login.ejs
│       ├── login-logado.ejs
│       ├── 404.ejs
│       └── includes/
│           ├── head.ejs
│           ├── nav.ejs
│           ├── footer.ejs
│           └── messages.ejs
├── frontend/
│   ├── main.js
│   ├── modules/
│   │   ├── login.js
│   │   └── contato.js
│   └── assets/css/style.css
├── public/
├── routes.js
├── server.js
└── webpack.config.js
```

---

## Segurança

Esse foi um ponto que levei a sério desde o início. As senhas são criptografadas com bcryptjs usando salt único por requisição. Todos os formulários têm token CSRF. Os headers HTTP são configurados com helmet. As variáveis sensíveis como string de conexão e secrets ficam isoladas no arquivo .env e nunca sobem para o repositório.

As rotas de contato são protegidas por um middleware de autenticação sem login, o usuário é redirecionado para a home com uma mensagem de erro.

---

## Como rodar localmente

Você vai precisar de Node.js v18 ou superior e uma conta no MongoDB Atlas.

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Kevin-Loran/agenda-contatos.git
cd agenda-contatos
npm install
```

Crie um arquivo .env na raiz do projeto com:

```
CONNECTIONSTRING=sua_string_de_conexao_mongodb
```

Depois rode em dois terminais separados:

```bash
# Terminal 1 - compila o frontend
npm run dev

# Terminal 2 - sobe o servidor
npm start
```

Acesse em: http://localhost:3000

---

## Rotas da aplicação

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | / | Página inicial com lista de contatos | Não |
| GET | /login/index | Página de login e cadastro | Não |
| POST | /login/register | Cadastra novo usuário | Não |
| POST | /login/login | Autentica usuário | Não |
| GET | /login/logout | Encerra sessão | Não |
| GET | /contato/index | Formulário de novo contato | Sim |
| POST | /contato/register | Salva novo contato | Sim |
| GET | /contato/index/:id | Editar contato existente | Sim |
| POST | /contato/edit/:id | Atualiza contato | Sim |
| GET | /contato/delete/:id | Remove contato | Sim |

---

## Autor

Kevin Loran
Estudante de Engenharia de Software, São Paulo.
github.com/Kevin-Loran
linkedin.com/in/kevinloran
