const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;


const counterSchema = new mongoose.Schema({
    Value: Number
 });


const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
