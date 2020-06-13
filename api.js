const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://root:84116593@127.0.0.1:27017/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const UserModel = require('./src/models/user');
var USERS = [
    { 'id': 1, 'username': 'edgar', 'password': '123456' },
    { 'id': 2, 'username': 'pontes', 'password': '123456' },
]; 

var HELLO = [
    { 'msg': 'Hello Express' }
];

function getHello() {
    return HELLO;
}

/*const saudacao = () => {
    var data = new Date()
    return data.getHours() <= 12 ? "Bom dia" : data.getHours() <= 18 ? "Boa Tarde" : "Boa Noite"
}

console.log(" saudação é " + saudacao());
*/

function getUsers() {
    return USERS;
}

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send(getHello());
});

const userRouter = require('./src/routes/user-route');

app.use('/user', userRouter);

app.listen(4000, function () {
    console.log('Hello Express Listen on Port 4000');
});