const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render('list', { listTitle: date.getDate(), newListItem: items });
});

app.get("/work", (req, res) => {
    res.render('list', {listTitle: "Work List", newListItem: workItems});
})

app.post("/", (req, res) => {
    if(req.body.list === "Work") {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }

});

app.listen(3000, () => {
    console.log("Server running on 3000");
});