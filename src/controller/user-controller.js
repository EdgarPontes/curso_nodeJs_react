'use strict'

const repository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

exports.getAllUsers = async (req, res, next) => {
    try {
        let dbReturn = await repository.getAll();
        res.status(200).send(dbReturn);
    } catch (e) {
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
};

exports.addUser = async (req, res, next) => {
    try {
        let user = await parserBodyUserCreate(req.body);
        user.password = md5(user.password + 'absdfghijklmnopqrstuvwxyz');
        let dbReturnUser = await repository.create(user);
        res.status(200).send(dbReturnUser);

    } catch (e) {
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
};

async function parserBodyUserCreate(body){
    return {
        name: body.name,
        email: body.email,
        password: body.password
    };
};

exports.editUser = async (req, res, next) => {
    try {
        let result = await repository.update(req.params.id, req.body);
        res.status(202).send(result);
    } catch (e) {
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'User delete!'
        });
    } catch (e) {
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
};

exports.auth = async(req, res, next) => {
    try {

        const user = await repository.autenticate({
            email: req.body.email,
            password: md5(req.body.password + 'absdfghijklmnopqrstuvwxyz')
        });

        if(!user){
            res.status(404).send({
                message: 'Usuario ou senha inválidos'
            });
            return;
        }

        var token = jwt.sign({userID: user._id}, 'absdfghijklmnopqrstuvwxyz', {expiresIn: '2h'});
        res.status(201).send({
            token: token
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição ' + e
        });
    }
};