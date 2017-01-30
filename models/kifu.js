'use strict'

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var schema = new mongoose.Schema({
    catogary: String,
    ev: String,
    gn: String,
    pb: String,
    br: String,
    pw: String,
    wr: String,
    km: String,
    ha: String,
    dt: { type: Date },
    pc: String,
    re: String,
    sgf: String,
    node_count: Number
});

schema.index({ dt: 1, catogary: 1, pb: 1, pw: 1 });
mongoose.model('Kifu', schema);

module.exports = function(connection) {
    return (connection || mongoose).model('Kifu');
};