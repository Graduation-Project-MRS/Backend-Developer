const { string } = require('joi');
const mongoose = require('mongoose');


const tipSchema = new mongoose.Schema({
    title: {type: string, require: true},
    description: {type: string, require: true}
});


module.exports = mongoose.model(Tip , tipSchema);