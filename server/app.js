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

const data=geolib.getPreciseDistance(
  { latitude:26.117108  , longitude:  91.802088  },
  { latitude: 26.148136, longitude: 91.786957,}
  )
        
      
     
  console.log(data);


app.listen(PORT, () => console.log(`server running on port ${PORT}`));
// 1 3.7-2.7
// 2 293-380
// 25%