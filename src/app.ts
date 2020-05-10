import express, { Router } from 'express';

import {restrouter} from './routes/api';
import {swaggerrouter} from './routes/swaggerroutes';
import cookieParser from 'cookie-parser'; //had to install @types/cookie-parser
import path from 'path';
import mongoose, { Schema, Document } from 'mongoose';


const app = express();



console.log('Connecting');
mongoose.connect('mongodb://host.docker.internal/todo',{ useNewUrlParser: true }).then(
  ()=>{
    console.log('Connected');
  }
  ,err => {
    console.log('Failed');
  }
);
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api',restrouter);
app.use(swaggerrouter);

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});


app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      console.log(r.route.path)
    }
  })
  return console.log(`server is listening on ${port}`);
});
