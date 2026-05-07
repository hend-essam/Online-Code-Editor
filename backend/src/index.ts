import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';

const start = async () => {
  console.log('starting up ....')

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error('MONGO_URI is missing in .env');

  const parsed = new URL(mongoUri);
  const allowedProtocols = ['mongodb:', 'mongodb+srv:'];
  const allowedHosts = /^[a-zA-Z0-9.-]+\.mongodb\.net$|^127\.0\.0\.1$|^localhost$/;

  if (!allowedProtocols.includes(parsed.protocol)) {
    throw new Error(`Invalid MONGO_URI protocol: ${parsed.protocol}`);
  }
  if (!allowedHosts.test(parsed.hostname)) {
    throw new Error(`Untrusted MONGO_URI host: ${parsed.hostname}`);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log('Listening on port 5000!!!!!!!!');
  });
};

start();
