//Initialize dependencies
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//Set template engine
app.set("view engine", "ejs");

//render static files
app.use(express.static("public"));

var task = ["Finish homework", "Buy groceries", "Do Laundry"];
var completed = ["Go to gym"];

//API route to add task

app.post("/task/add", (req, res) => {
  var newTask = req.body.new_task;
  task.push(newTask);
  res.redirect("/");
});

//API route to delete task

app.post("/task/delete", (req, res) => {
  var finishedTask = req.body.check;
  //check for the "typeof" the finished task, then add into the completed task
  if (typeof finishedTask === "string") {
    completed.push(finishedTask);

    //If task already exists in completed array then remove it
    task.splice(task.indexOf(finishedTask), 1);
  } else if (typeof finishedTask === "object") {
    for (var i = 0; i < finishedTask.length; i++) {
      completed.push(finishedTask[i]);
      task.splice(task.indexOf(finishedTask[i]), 1);
    }
  }
  res.redirect("/");
});

//Render root template
app.get("/", function (req, res) {
  res.render("index", { task: task, completed: completed });
});

//set app to listen on port 3000
app.listen(3000, function () {
  console.log("App server is running on port 3000");
});
