const mongoose = require('mongoose');

const connectedToDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI)
      console.log("Conncted TO MONGO" , conn.connection.host)
   } catch (error) {
      console.log(error)
   }

}

module.exports = connectedToDB