'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true, select: false },
    status: { type: Boolean, required: true, default: true },
    creationDate: { type: Date, default: Date.now },
}, { versionKey: false });

module.exports = mongoose.model('User', UserModel);