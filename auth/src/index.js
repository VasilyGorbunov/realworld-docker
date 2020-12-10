const express = require('express');
const {connectDB} = require('./helpers/db')
const {port, host, db} = require('./configuration')
const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`AUTH Service is started on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Database ${db}`);
  });
};

app.get('/test', (req, res) => {
  res.send('Out AUTH server is working....')
});

connectDB()
  .on('error', console.log)
  .on('disconnect', connectDB)
  .once('open', startServer)