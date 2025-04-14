import mongoose  from "mongoose";

const connection = async() => {
    try{
        await mongoose.connect(process.env.URL)
        console.log("Connected to MongoDB successfully")
    }catch(err){
        console.error("Failed to connect to MongoDB", err)
        process.exit(1)
    }
}

export default connection;