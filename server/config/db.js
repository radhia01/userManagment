const mongoose = require("mongoose");
const db = mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("Db connection success")
}).catch(error=>{
    console.log(error.message,"DB connection Failed")
});
module.exports = db;
