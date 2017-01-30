var express = require('express');
var db = require('../utils/database.js').connection;
var Kifu = require('../models/kifu')(db);
var router = express.Router();
var Q = require('q');
var sgf_parser = require('node-sgf-parser');
var iconv = require('iconv-lite');

router.post('/classic', function(req, res) {
    var str = req.body.sgf;
    str = str.replace(/\r\n/g, '');
    var sgf = sgf_parser.parseFromSgf(str);
    console.log(sgf);
    var kifu = new Kifu();
    kifu.gn = sgf.info.GN;
    kifu.ev = sgf.info.EV;
    var dt = sgf.info.DT;
    if (dt.indexOf(',') != -1) {
        dt = dt.split(',')[0];
    }
    kifu.catogary = "classic";
    kifu.dt = dt;
    kifu.pc = sgf.info.PC;
    kifu.pb = sgf.info.black.name;
    kifu.br = sgf.info.black.rank;
    kifu.pw = sgf.info.white.name;
    kifu.wr = sgf.info.white.rank;
    kifu.re = sgf.info.RE;
    kifu.km = sgf.info.KM;
    kifu.node_count = sgf.nodeCount;
    kifu.sgf = str;


    kifu.save(function(err, savedKifu, numAffected) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({ node_count: savedKifu.node_count });
        }
    });
});

router.get('/', function(req, res, next) {
    Kifu.find()
        .exec()
        .then(function(kifus) {
                res.json(kifus);
            },
            function(err) {
                res.status(500).end();
            }
        )
});

router.get('/abstract', function(req, res, next) {
    Kifu.find()
        .select('dt ev pb pw')
        .sort('dt')
        .exec()
        .then(function(kifus) {
                res.json(kifus);
            },
            function(err) {
                res.status(500).end();
            }
        )
});

router.get('/delete', function(req, res, next) {
    Kifu.remove({})
        .exec()
        .then(function(data) {
                res.json(data);
            },
            function(err) {
                res.status(500).end();
            }
        )
});


module.exports = router;