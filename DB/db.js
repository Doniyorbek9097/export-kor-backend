var mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    const connect = await mongoose.connect(process.env.MONGO_URL);
     console.log(`Connect to Mongo DataBase name:${connect.connection.name}`)
  } catch(e) {
    console.log(e);
  }
}

module.exports = connectDB;