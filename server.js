const express = require("express")
const connectDb = require("./config/dbconection")
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const app = express()
connectDb();

const port = process.env.Port || 5000;

app.use(express.json())

app.use(errorHandler);
app.use("/api/contacts",require("./routes/contactRouts"))
app.use("/api/users",require("./routes/userRoutes"))


app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})