import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// ✅ CORS setup to allow only your frontend domain
app.use(
  cors({
    origin: 'https://book-store-backend-two-gamma.vercel.app', // your frontend Vercel URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// Test route
app.get('/', (request, response) => {
  return response.status(200).send('Welcome To MERN Stack Tutorial');
});

// Book routes
app.use('/books', booksRoute);

// MongoDB connection and server start
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
