var express = require('express');
var router = express.Router();
var calculate = require('../utils/python');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('python', { title: 'Express' });
});

router.post('/bs', async(req, res) => {
  const body = req.body;
  var result;
  try {
      result = await calculate(Number(body.spot), Number(body.strike), Number(body.rate), Number(body.days), Number(body.volatility), Number(body.multiplier));
  } catch (error) {
    res.status(500).send(error)
  }
  res.json(result);
});
module.exports = router;
