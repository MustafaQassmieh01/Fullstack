const PORT = 3000|| process.env.PORT;
const express = require('express');
// const connection = require('./connection');
// const employee = require('./routs/employeeRoutes');

const app = express();
require("dotenv").config();

// connection()
app.use(express.json());
app.use(express.static("dist"))


app.listen(PORT,()=>{
    console.log("Listening on port " +PORT);
});

// app.get('/employees',async(req,res)=>
// {
//     try {
//         const users = await userInfo.find();
//         res.status(200).json(users);
//     } catch (err) {
//         res.json({"error": console.log(err)});
//     }
    
// })