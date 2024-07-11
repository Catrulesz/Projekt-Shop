var express = require('express');
var router = express.Router();
var userimpl = require('../postgres/userImpl')

/* GET users listing. */
router.post('/', async function(req, res, next) {
  try{
    console.log(req.body);

  }
  catch(e){
    console.error(e);
  }
  const data = await userimpl.CheckUser(req.body.user.login, req.body.user.password);
  console.log(data);
  if (data != false)
  {
    res.cookie("sesion cookie", data.username,   {expires:1000*60*10,maxAge: 30000});
    //res.send("cookie sent")
    res.json(data);
  }
  else{
    res.status(400).json({message : "server error"});
  }
});

module.exports = router;
