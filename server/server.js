require("dotenv").config();
const express = require ("express");
const cors = require("cors");
const authRoute = require("./router/auth-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error_middleware");
const app = express();


const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credential:true,
};


app.use(express.static("public/"));
app.use(cors(corsOptions))
app.use(express.json());

app.use("/api/auth", authRoute)

app.use("/api/admin", adminRoute) 



app.use(errorMiddleware);

const PORT = 5000;
connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
});
})

