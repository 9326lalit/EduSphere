

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import courseRoute from './routes/courses.js';
import eventRouter from './routes/event.js';
import contactRoute from './routes/contact.js';

// Stripe setup
import Stripe from 'stripe';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json())

// Connect to the database
connectDB();

// Middlewares
app.use(cookieParser());
// app.use(
//   cors({
//     origin:"*",
//     origin: ['https://akhand-sports.vercel.app'], 
//     methods : ["POST","GET"],
//     credentials: true,
//   })
// );
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/event', eventRouter);
app.use('/api/auth', authRoute);
app.use('/api/user', usersRoute);
app.use('/api/courses', courseRoute);
app.use('/api/contact', contactRoute);

// Stripe Payment Intent Creation
// app.post('/create-payment-intent', async (req, res) => {
//   try {
//     const { amount } = req.body;

//     // Validate amount
//     if (!amount || typeof amount !== 'number' || amount <= 0) {
//       return res.status(400).send({ error: 'Invalid or missing amount' });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount, // Amount in cents
//       currency: process.env.DEFAULT_CURRENCY || 'usd', // Default currency fallback
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error('Error creating payment intent:', error.message);
//     res.status(500).send({ error: error.message });
//   }
// });

// Global Error Handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}, // Hide stack trace in production
  });
});

// Start Server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
