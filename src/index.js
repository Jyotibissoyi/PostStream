const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const route = require('./routes/routes.js');
require('dotenv').config();
const app=express();
const port = process.env.PORT || 3001;
const url =process.env.MONGO_URL|| "mongodb+srv://Jyoticoder:Jyoti2025@jyoticoder-cluster.ljxxb2x.mongodb.net/Poststream";
// mongoose.set('strictQuery', true);

app.use(multer().any());
app.use(express.json());

mongoose.connect(url)
.then(() => console.log("MongoDb is Connected"))
.catch((err) => console.log(err));

app.use('/',route);

app.listen(port, () => console.log(`Server is Running Succesfully ${port}`));