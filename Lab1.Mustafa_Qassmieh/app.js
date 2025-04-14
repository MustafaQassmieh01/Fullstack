import express from 'express'
import logger from 'morgan'
import router from './routes/recipe.js'
import "dotenv/config"
import connection from './connect/mongoDb.js'


export const app = express()
connection()
app.use(express.json())
app.use(express.static('public'))
app.use('/',router)
app.use(logger('div',{immediate:true}))
const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
