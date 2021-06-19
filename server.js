const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({"extended": false}));
app.use(bodyParser.json());
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

const setTimestamp = (dateTime, local) => {
  let timestamp = dateTime ? new Date(dateTime) : new Date(Date.now());

  if (timestamp.toString() === 'Invalid Date')
    timestamp = new Date(parseInt(dateTime));
    if (timestamp.toString() === 'Invalid Date') 
      return undefined;

  return {"unix": timestamp.valueOf(), "utc": local ? timestamp.toString() : timestamp.toUTCString()}
}

//app.get('/api', (req, res) => {
//  let timestamp = setTimestamp();
//  res.json(timestamp);
//});
//
//app.get('/api/local', (req, res) => {
//  let timestamp = setTimestamp(null, true);
//  res.json(timestamp);
//});
//
//app.get('/api/:dateTime', (req, res) => {
//  let timestamp = setTimestamp(req.params.dateTime);
//  if (timestamp)
//    res.json(timestamp);
//  else
//    res.status(422).send({ error : "Invalid Date" });
//})
//
//app.get('/api/:dateTime/local', (req, res) => {
//  let timestamp = setTimestamp(req.params.dateTime, true);
//  if (timestamp)
//    res.json(timestamp);
//  else
//    res.status(422).send({ error : "Invalid Date" });
//})
//
app.get('/whoami', (req, res) => {
  res.json({"ipaddress": req.ip, "language": req.headers['accept-language'], "software": req.headers['user-agent']})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;