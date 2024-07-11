var express = require("express");
var router = express.Router();

router.get('/testAPI', function(req, res, next){
    res.json({b:"API TRENNING"});
});

module.exports = router;