const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const connect = require("./config/db");
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: ["https://taskforge-radhia-rahmani.vercel.app","http://localhost:3000","http://localhost:3001"], 
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// ap
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});
app.use(cookieParser());
connect;
app.use("/", require("./routes/User"));
app.use("/", require("./routes/Role"));
app.use("/", require("./routes/Project"));
app.use("/", require("./routes/UserProject"));
app.use("/", require("./routes/Priority"));
app.use("/", require("./routes/Status"));
app.use("/", require("./routes/Task"));
