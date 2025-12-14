import dotenv from 'dotenv';
import { app } from './app.js';
import connectdb from './models/index.js';
import { PORT } from './constants.js';

// Configure environment variables first
dotenv.config({
  path: './.env',
});

// Connect to MongoDB and start server
connectdb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
  })
  .catch((err) => console.log(`Error connecting to DB: ${err}`));