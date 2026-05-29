
import { app } from './app.js';
import connectdb from './models/index.js';
import { PORT } from './constants.js';

// Connect to MongoDB and start server
connectdb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
  })
  .catch((err) => console.log(`Error connecting to DB: ${err}`));