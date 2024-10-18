const express = require('express');
const connection = require('./connection');
const Recipe = require('./model/recipe');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;
const recipeRoutes = require('./routes/recipeRoutes');

require("dotenv").config();


const path = require('path');
connection();
app.use(express.static("public"))
app.use(express.json())
app.use('/api',recipeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/home', async(req, res)=> {
    res.sendFile(path.join(__dirname, 'public/home.html'))
});

app.get("/recipe",async(req,res)=>
{
    res.sendFile(path.join(__dirname, 'public/recipe.html'))
    // try {
        // `const recipes = await Recipe.find()`
        // res.status(200).json(recipes)
        
    // }
    // catch(err){
    //     res.json({"error": console.log(err)})
    // }
    
})