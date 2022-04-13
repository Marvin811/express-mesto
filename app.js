const express = require('express');
const mongosee = require('mongoose');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/users'));

async function start() {
  try {
    await mongosee.connect('mongodb://localhost:27017/mestodb');
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log('Server has been started...');
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

start();
