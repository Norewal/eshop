const express = require('express');
const app = express();
app.use(express.json());
const morgan = require('morgan'); //middleware library
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors());
//Middleware
app.use(express.json());
app.use(morgan('tiny'));

const categoriesRouter = require('./routers/categories');
const productsRouter = require('./routers/products');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');

const api = process.env.API_URL;

//routers
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);

//db connection
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB connection is ready');
  })
  .catch(() => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(api);
  console.log('Server is running on http://localhost:3000');
});
