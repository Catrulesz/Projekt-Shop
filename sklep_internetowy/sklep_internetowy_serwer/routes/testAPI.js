var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next){
    res.json({a:"API TRENNING"});
});

module.exports = router;