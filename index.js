require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express")
const app = express();
const port = 300;
const mongoose = require("mongoose");
const {Schema} = mongoose;
const {model} = mongoose;

const password = process.env.pass;
app.use(bodyParser.urlencoded({extended:true}))

const connectionString = `mongodb+srv://taofeeq:${password}@sportdb.rjdbqsv.mongodb.net/?retryWrites=true&w=majority`;

// mongoose.connect(connectionString)
    
// ================ MongoDB connection =================
async function connectDB(){
    await mongoose.connect(connectionString)
    console.log("DB connected successfully");
}

// Creating new schema

const userSchema = new Schema({
    name : String,
    address : String,
    age : Number
});

// Creating new Model 



const userModel = new model("user", userSchema)



// newUser.save()

app.get("/user", function(request, response){
    response.send("Are you there?!!")
})

app.post("/", async (req, res)=>{
    
    const newUser = userModel.create({
        name : req.body.name,
        address : req.body.address,
        age : req.body.age
    })

    if(newUser){
        console.log("New user created successfully!");
    }else{
        console.log("Error while adding new user");
    }
});

app.get("/users", async(req, res)=>{
    const allUser = await userModel.find();
    res.json(allUser)
})

app.listen(port, function(){
    connectDB()
    console.log(`Server is running on port ${port} ..`);
})