const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


const app = express();
const router = express.Router();

//conectar ao banco
mongoose.connect('mongodb+srv://guaribas:guaribas@cluster0.v87db.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//carregar os Modules
const Product = require('./models/product')

//carregar rotas
const indexRoutes = require('./routes/index')
const productRoutes = require('./routes/products')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/products', productRoutes);

module.exports = app;