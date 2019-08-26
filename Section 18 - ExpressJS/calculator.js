const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");    
})

app.get("/bmi", (req,res) => {
    res.sendFile(__dirname + "/bmicalculator.html");
})

app.get("/about", (req,res) => {
    res.send(`Hey there! I'm Max from Germany and a CompSci Student in my 5th masters semester. 
    In parallel to visiting the university I decided to follow some udemy courses in order to brush up my programming skills and expand my skillset in general!` );
})

app.post("/", (req,res) => {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let result = num1+num2;
    res.send("The sum is: " + result);
})

app.post("/bmi", (req,res) => {
    let w = Number(req.body.weight);
    let h = Number(req.body.height);
    let bmi = w / Math.pow(h,2);
    res.send("Your BMI is: " + bmi);
})

app.listen(3000), () => {
    console.log("Server started on port 3000");    
};