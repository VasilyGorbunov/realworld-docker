const express = require('express');
const axios = require('axios');
const {connectDB} = require('./helpers/db')
const {port, host, db, apiUrl} = require('./configuration')
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

app.get('/testwithapidata', (req, res) => {
  axios.get(apiUrl + '/testapidata').then(response => {
     res.json({
       testapidata: response.data.testwithapi
     });
  })
});

app.get('/api/currentUser', (req, res) => {
   res.json({
     id: '1234',
     email: 'foo@app.com'
   });
});

connectDB()
  .on('error', console.log)
  .on('disconnect', connectDB)
  .once('open', startServer)