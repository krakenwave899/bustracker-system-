require('dotenv').config();
const connectDB = require('./db');

connectDB().then(() => {
  console.log('Test passed! Database is working.');
  process.exit(0);
});