const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.get('/', function (req, res) {
  res.send('Hello World !!!');
});

app.post('/', function (req, res) {
  res.send(req.body);
});

app.listen(PORT);
