var express = require('express');
var PythonShell = require('python-shell');
var router = express.Router();

async function callPythonCode(spot, strike, rate, days, volatility, multiplier = 100) {
  return await PythonShell.run('./models/bs/bs-caller.py', {
      args: [spot, strike, rate, days, volatility, multiplier]
    }).then(res => {let returnObj = {}; 
      res.map(val => {
      const valSplit = val.split(':');
      returnObj[valSplit[0].trim()] = valSplit[1].trim();
    }); return returnObj}).catch(err => console.log(err))
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/run-python', (req, res) => {
  PythonShell.run('./bs-caller.py', null, (err, results) => {
    if (err) {
      res.staus(500).send(err);
    } else {
      res.json(JSON.parse(results));
    }
  })
});

router.post('/bs', (req, res) => {
  const body = req.body;
  callPythonCode(body.spot, body.strike, body.rate, body.days, body.volatility, body.multiplier).catch(error => res.status(500).send(error)).then((result) => {
  res.json(result)});
})


module.exports = router;
