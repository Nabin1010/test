const mongoose = require('mongoose'); // importing mongoose,config and mongouri from packages and another files

const config = require('config');

const db = config.get('mongoURI');

const connectDB = async()=>{ //trying for connecting db

    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology : true,
            useCreateIndex: true,
        });

        console.log('mongodb connected ...');

    } catch (error) {
        console.error(err.message); // if any error get this print the error 
        process.exit(1); //exit with failer 
    }
}

module.exports = connectDB;  //exporting this method for the use of another file