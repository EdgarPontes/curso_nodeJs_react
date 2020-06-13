'use strict'

const repository = require('../repository/user-repository');

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
        let dbReturnUser = await repository.create(req.body);
        res.status(200).send(dbReturnUser);
    } catch (e) {
        res.status(500).send(
            {
                message: 'Ops! Something went worng', error: e
            }
        );
    }
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