//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const Schema = mongoose.Schema;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = new Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {

  Item.find((err, docs) => {
    if (err) {
      console.log("Error finding items");

    } else {
      if (docs.length === 0) {

        Item.insertMany(defaultItems, (err) => {
          if (err) {
            console.log("Something went wrong when adding your items to the model!");
          } else {
            console.log("Successfully added items to model!");
          }
        })

      }
      res.render("list", { listTitle: "Today", newListItems: docs });
    }
  });
});

app.get("/:customList", (req, res) => {
  const listName = _.capitalize(req.params.customList);
  List.findOne({ name: listName }, (err, results) => {
    if (err) {
      console.log("Something went wrong!");
    } else {
      if (!results) {
        console.log("List didn't exist. Creating a new one!");

        const list = new List({
          name: listName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + listName);
      } else {
        res.render("list", { listTitle: listName, newListItems: results.items });
      }
    }
  });
})

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({ name: itemName });

  if (listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    console.log("Not default list!");

    List.findOne({ name: listName }, (err, result) => {
      if (!err) {

        result.items.push(newItem)
        result.save();
        res.redirect("/" + listName);
      } else {
        console.log(err);
      }
    });
  }
});

app.post("/delete", function (req, res) {
  const listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndDelete(req.body.checkbox, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate({name: listName},{$pull: {items: {_id: req.body.checkbox}}} ,(err,document) => {
      if (!err) {
        res.redirect("/"+listName);
      }
    });
  }

})

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
