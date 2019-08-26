const express = require("express");
const request = require("request");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req,res) => {
    let fName = req.body.first;
    let lName = req.body.last;
    let mail = req.body.mail;

    console.log("Name is " + fName + " " + lName);
    
} ) 

app.listen(3000, () => {
    console.log("Server running on port 3000");    
})