const express = require('express')
const mysql = require("mysql2");
const dotenv = require('dotenv');
const path = require('path');
const app = express()
dotenv.config({ path: "./.env"})
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_Password,
  database: process.env.DATABASE
})
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/auth', require('./routes/auth'));

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error){
        console.log(error);
    } else {
        console.log("yayy!!! connected")
    }
})
app.use('/', require('./routes/pages'));

app.listen(5020 , () => {
  console.log("Server started on Port 5020")  
})