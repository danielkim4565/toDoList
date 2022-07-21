const express = require('express');
const date = require(__dirname + "/date.js");

const app = express();

app.use(express.urlencoded());
app.use(express.static("public"));

app.set("view engine", "ejs");



var item = [];
var workItem = [];

app.get("/", function(req, res) {
    let day = date.getDate();
    res.render("list",{listName: day, newListItem: item, listType: "today"});
});

app.get("/work", function(req, res) {
    res.render("list", {listName: "Work", newListItem: workItem, listType: "work"});
});

app.post("/work", function(req, res) {
    workItem.push(req.body.newItem);
    res.redirect("/work");
});

app.post("/", function(req,res){   
     if(req.body.button === "today") {
        item.push(req.body.newItem);
        res.redirect("/");
     } else if(req.body.button === "work") {
        workItem.push(req.body.newItem);
        res.redirect("/work");
     }
     
});

app.listen(3000, function(){
    console.log("server up");
});