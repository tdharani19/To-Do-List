const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["Buy Food", "Cook Food"];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", function(req, res){

  const day = date.getDate();

 res.render("list", {title : day, newItemNames : items});
});

app.get("/work", function(req, res){
  res.render("list", {title : "Work", newItemNames : workItems});
});

app.get("/about", function(req, res){
  res.render("about")
});

app.post("/", function(req, res){
  let item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");
  }

  // console.log(req.body);
});

app.listen(3000, function(req, res){
  console.log("server started");
});
