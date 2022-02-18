const express=require('express');
const app=express();
const cors=require('cors');
app.use(express.json());
app.use(cors());
let people=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];
app.get('/info',(req,res)=>{
    res.send(`<h1>Phone-book has info for ${people.length} people</h1><h3>${new Date()}</h3>`)
})
app.get('/',(req,res)=>res.send("<h1>Welcome to phone-book!</h1>"));
app.get('/people',(req,res)=>res.send(JSON.stringify(people)));
app.get('/people/:id',(req,res)=>{
    let id=req.params.id;
    let data=people.filter(person=>person.id===Number(id));
    data.length!==0?res.json(data):res.status(404).send("<h1 style='backround-color:red'>Data not found</h1>");
})

app.post('/people',(req,res)=>{
    let body=req.body;
    if(body.name&&body.number)
    {
let name=people.find(person=>person.name===body.name);
let number=people.find(person=>person.number===body.number);
if(name&&number)
{
    res.json({error:"Name and number already exists"});
}
else if(name){
    res.json({error:"enter unique name"});
}
else if(number)
{
    res.json({error:"enter unique number"});
}
else{
    body["id"]=Math.floor(Math.random()*999);
    people.push(body);
    }
}
    else{
        res.json({error:"Enter both name and number!"});
    }
})
app.delete('/people/:id',(req,res)=>{
    let id=Number(req.params.id);
    people=people.filter(person=>person.id!==id);
})
app.put('/people/:id',(req,res)=>{
    let id=Number(req.params.id);
    let data=req.body;
    data["id"]=id;
    people=people.map(person=>{
        return person.id!==id?person:data;
    })
})
const PORT=process.env.PORT||3001;
app.listen(PORT,()=>console.log("running..."));