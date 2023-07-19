const mongoose = require("mongoose");

//connect
const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://isbhakhalid:NBMZGCFATeg5hCYA@mongodb-demo.zmhecw9.mongodb.net/income-expenses-app?retryWrites=true&w=majority"
    );
    console.log("Db connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

dbConnect();
