const express = require ('express'); //importing express from package 
const connectDB = require('./config/db'); //importing db from another file

const app = express(); //initilizing expree

connectDB(); //connecting db

app.get('/',(req,res)=>res.send('API IS RUNNING')); //simple route whre send  method send the messages

//init middleware
app.use(express.json({extended :false }));


//defining the routes

app.use('/api/users',require('./routes/api/users'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/auth',require('./routes/api/auth'));

const PORT = process.env.PORT || 5000; //defining port here 

app.listen(PORT , ()=>console.log(`server started at ${PORT}`)); //listen for defining port here 