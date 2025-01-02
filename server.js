const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./router');

const app = express();
const PORT = 3000;

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://abharathi1202:Bharathi@cluster0.eojkb.mongodb.net/databaseName';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
