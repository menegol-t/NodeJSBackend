import mongoose from "mongoose";

const connectionString = process.env.MONGO_ATLAS_SRV || "mongodb://localhost:27017/miDatabase"

export const innitMongo = async() => {
    try{
        console.log(`Conecting to mongo`);
        await mongoose.connect(connectionString)
        console.log(`Connected`);
    }catch(err){
        console.log(`Error`);
        console.log(err);
        return err
    }
}