const express = require("express");
const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    let today = new Date();
    let dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", dateOptions)
    res.render('list', { kindOfDay: day, newListItem: items });
});

app.post("/", (req, res) => {
    items.push(req.body.newItem);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on 3000");
});