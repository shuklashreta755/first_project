
const mongoose= require("mongoose");
const DB_NAME =require("../../constants.js");

const connectDB = async () => {

    try {
       const connectionInstance=await mongoose.connect               // connect method return promise and we use async and await handle to promise 
       (`${process.env.MONGODB_URI}/${DB_NAME}`)
        // ('${process.env.MONGODB_URI}')
       console.log(`\n MongoDB connected!! ${connectionInstance.connection.host}`);
    }
    catch(error) {
      console.log("MONGODB connection error", error);
      process.exit(1)
    }
}

module.exports =connectDB;