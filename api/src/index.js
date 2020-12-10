const express = require('express');
const mongoose = require('mongoose');
const {connectDB} = require('./helpers/db')
const {port, host, db} = require('./configuration')
const app = express();

const postSchema = new mongoose.Schema({
  name: String
});

const Post = mongoose.model('Post', postSchema);


const startServer = () => {
  app.listen(port, () => {
    console.log(`API Service is started on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Database ${db}`);

    // const silence = new Post({ name: 'Silence' });
    // console.log(silence);

    // silence.save((err, savedSilence) => {
    //   console.log('savedSilence wuth volumes!!!', savedSilence);
    // });

    Post.findOne({name: 'Silence'}, (err, findSilence) => {
      console.log('findSilence', findSilence);
    });


  });
};

app.get('/test', (req, res) => {
  res.send('Out API server is working....')
});

connectDB()
  .on('error', console.log)
  .on('disconnect', connectDB)
  .once('open', startServer)