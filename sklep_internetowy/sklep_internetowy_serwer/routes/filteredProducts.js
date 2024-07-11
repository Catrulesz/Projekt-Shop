var express = require('express');
var router = express.Router();
var productImpl = require('../postgres/productImpl');


router.post('/',async function(req, res, next) {
    try{
        console.log(req.body);
    
      }
      catch(e){
        console.error(e);
      }


      const data = await productImpl.filterProducts(req.body.product)
      console.log(data);


      if (data != false)
      {
        res.json(data);
      }
      else{
        res.status(400).json({message : "brak produktów"});
      }
      /*else{

        const data = await productImpl.searchProducts(req.body.product);
        console.log(data);
        if (data != false)
        {
          res.json(data);
        }
        else{
          res.status(400).json({message : "brak produktów"});
        }
      }*/
});

module.exports = router;
