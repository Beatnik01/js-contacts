var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
// query로 method를 받아서 request의 HTTP method를 바꿔줌
var app = express();

// DB setting ...
mongoose.connect(
  "mongodb://ocidos0417:ocidos0417@ds018508.mlab.com:18508/contact_book",
  { useNewUrlParser: true }
);
var db = mongoose.connection;
db.once("open", function() {
  console.log("DB connected");
});
db.on("error", function(err) {
  console.log("DB ERROR : ", err);
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.use("/", require("./routes/home")); //1
app.use("/contacts", require("./routes/contacts")); //2

// Port setting
app.listen(3000, function() {
  console.log("server on!");
});
