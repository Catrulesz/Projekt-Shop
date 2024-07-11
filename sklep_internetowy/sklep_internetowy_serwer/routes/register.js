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
  const data = await userimpl.LookForUserAndAdd(req.body.user.username, req.body.user.login, req.body.user.password);
  console.log(data);
  if (data == true)
  {
    res.json({message : "register complete"});
  }
  else{
    res.status(400).json({message : "użytkownik o podanym loginie już istnieje"});
  }
});

module.exports = router;
