import express from 'express';

//configure Express.js app
const app = express();

//static directories
app.use(express.static('public'));

export default app;