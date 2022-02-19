const mongoose=require('mongoose');
const password=process.argv[2];
const url=`mongodb+srv://katty:${password}@phonebook.ug4r3.mongodb.net/Testing-phonebook?retryWrites=true&w=majority`;
mongoose.connect(url);

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