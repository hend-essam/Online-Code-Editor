import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  console.log('starting up ....')
 

  try {
    await mongoose.connect('mongodb://127.0.0.1/mydatabase', {});
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log('Listening on port 5000!!!!!!!!');
  });
};

start();
