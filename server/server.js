const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const bookRoute = require("./routes/bookRoute")
const userRoute = require("./routes/userRoute")
const checkoutRoute = require("./routes/checkoutRoute")
const connectedToDB = require("./configurations/database")
const cors = require("cors")
const app = express();

// @Database Connection Function 
connectedToDB()

// @Adding EXPRESS Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors({
    origin: 'https://seahorse-app-sqclk.ondigitalocean.app/'
}));

app.get("/", (req,res) => res.send("API Deployed")) 

// @Registering URLS
app.use("/api/books", bookRoute );
app.use("/api/users", userRoute)
app.use("/api/checkout", checkoutRoute);


// @Starting Server
app.listen(PORT, () => console.log(`Server Running On PORT ${PORT}`))