//carregar a varivel diferete do arquivo unico
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//chmando as rota da oasta
const indexRouter = require('./routes/index.js');

// configurar middleware
app.set('view engine', 'ejs'); //mecanismo de visualização //app set é usado para recuperar variaveis ou armazenar
app.set('views', __dirname + '/views'); //dá o caminho do diretório do módulo atual
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public')); //pasta de arquivos publicos tipo sddtkylef

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => {
    console.log('MongoDB CONECTADO com sucesso!');
});

//criando a rota local para usar no app
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000);