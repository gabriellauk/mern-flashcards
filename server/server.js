const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
//app.use(require("./routes/record"));

const mongoose = require( 'mongoose' )
mongoose.connect( process.env.ATLAS_URI )
const db = mongoose.connection
db.on( 'error', error => console.error( error ) )
db.once( 'open', error => console.log( 'Connected to Mongoose' ) )

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});