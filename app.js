const express = require ('express');
const mongoose = require('mongoose');
cos
const app=express();
const port=3000;

app.use(express.json());
app.use(cors())

mongoose.connect("mongodb://localhost:27017/mydatabse",{useNewUrlParser: true});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{console.log ('connected to mongodb')});


// declaring the schema of the Collection
const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
});

// Creating the collection name in the database, name of the collection in the database is 'Master' 
//referring the userSchema and create in the mydatabase database. 
const User = mongoose.model('Master',userSchema);

app.post('/users',async(req,res)=>{
    try{
    const user =new User(req.body);
    await user.save();
    res.status(201).send(user);
}catch(error){
    console.error('Error saving user:', error);
    res.status(500).send(error);
}
});

/*app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);  // Corrected status code
    } catch (error) {
        res.status(500).send(error);
    }
});*/

app.get('/users',async(req,res)=> {
    try{
        const users =await User.find();
        res.status(200).send(users);
    }catch(error){
        res.status(400).send(error);
    }
});

app.get('/users/:id',async(req,res)=>{
    try{
        const user =await User.find({id:req.params.id});
        if(!user){
            return res.status(404).send({error:"user not found"})
        }
        res.status(200).send(user);
    }catch(error){
        res.status(500).send(error);
    }
    }
)


app.get('/users/name/:name',async(req,res)=>{
    try{
        const user =await User.find({name:req.params.name});
        if(!user){
            return res.status(404).send({error:"user not found"})
        }
        res.status(200).send(user);
    }catch(error){
        res.status(500).send(error);
    }
    }
)

app.get('/users/age/:age',async(req,res)=>{
    try{
        const user =await User.findOne({age:req.params.age});
        if(user.length === 0 ){
            return res.status(404).send({error:"user not found"})
        }
        res.status(200).send(user);
    }catch(error){
        res.status(500).send(error);
    }
    }
)

// it work 
app.delete('/users/:id',async(req,res)=>{
    try{
        const user =await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send({error: 'user not found'});
        }
        res.status(200).send({ message:'user deleted'});
    }catch(error){
            res.status(500).send(error);
        }
    }
)

// Its Works
/*app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
}
);*/


app.put('/users/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators: true});
        if(!user){
            returnres.status(404).send({error:'User not found'})
        }
        res.status(200).send(user);
    }catch(error){
        console.error('Error updatin user');
        res.status(500).send({error:'Internal Server Error'});
    }
})



app.patch('/users/:id',async(req,res)=>{
    try{

        const user = await User.findById(req.params.id); // Fetch the user from your data source

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const updates =Object.keys(req.body);
        const allowedUpdates = ["name","age"];
        const isValidOperation= updates.every((update)=>allowedUpdates.includes(update));

        if(!isValidOperation){
            return res.status(400).send({error:'Invalid updates'})
        }
        updates.forEach((update)=>(user[update]=req.body[update]));
        await user.save();
        res.status(200).send(user);
    }catch(error){
        console.log('Error Updating user');
        res.status(500).send({error:'Internal server error'})
    }
    }
)


app.listen(port,()=>{console.log(`server is running in port ${port}`);});



