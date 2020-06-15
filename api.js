const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://edgar:84116593@127.0.0.1:27017/curso_angular?authSource=admin&gssapiServiceName=mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send(getHello());
});

const userRouter = require('./src/routes/user-route');
app.use('/user', userRouter);

const productRouter = require('./src/routes/product-route');
app.use('/product', productRouter);

app.listen(4000, function () {
    console.log('Express Listen on Port 4000');
});