const mongoose=require('mongoose');
const password=process.argv[2];

mongoose.connect(process.env.MONGO_URL);

const phoneSchema=new mongoose.Schema({name:String,number:Number});
phoneSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})
const Person=new mongoose.model('Person',phoneSchema);
module.exports=Person;