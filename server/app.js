const express = require("express");
const app = express();
const geolib=require("geolib");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./db/db");

const PORT = process.env.PORT;

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser("secret"));

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  })
);

const routes = require("./routes");



app.use("/", routes);

// test 




app.listen(PORT, () => console.log(`server running on port ${PORT}`));
// 1 3.7-2.7
// 2 293-380
// 25%