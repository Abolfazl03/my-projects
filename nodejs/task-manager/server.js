const dotenv = require('dotenv');
const mongoose = require('mongoose')
const express = require('express')
const taskRoutes = require('./routes/taskRoutes');

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());
app.use('/api/v1/tasks', taskRoutes);


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_LOCAL);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};



const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();