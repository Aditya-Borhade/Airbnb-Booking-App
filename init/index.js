const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
// here i  have require Listing model so  I can use it to save, find, update, 
// or delete stuff from the listings collection in MongoDB.

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"682e0f22a083637363604245"}));
    await Listing.insertMany(initData.data);
    console.log("data was initializes");
}
initDB();