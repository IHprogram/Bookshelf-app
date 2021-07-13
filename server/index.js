import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import mongoURI from './mongouri.js';
import bookRoutes from './routes/books.js';

const app = express();
const port = 3002;

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect(mongoURI, { useNewPaser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => {
    console.log(`${port}に接続しました`)
  }))