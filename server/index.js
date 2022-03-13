const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());

//local mongodb connection
mongoose.connect("mongodb://localhost:27017/mern-stack2?readPreference=primary&appname=MongoDB%Compass&ssl=false", { useNewUrlParser: true, useUnifiedTopology: true }, console.log("connected to mongodb"));

//api to insert new friend to database
app.post("/addFriend", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  const addFriend = new FriendModel({ name: name, age: age });
  await addFriend.save();
  res.send("New Friend Inserted");
  console.log(req.body);
});

//api to get all friends from database
app.get("/read", async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", async (req, res) => {
  const id = req.body.id;
  const newAge = req.body.newAge;
  const newName = req.body.newName;
  try {
    await FriendModel.updateOne({ _id: id }, { $set: { age: newAge, name: newName } });
  } catch (err) {
    console.log(err);
  }
  res.send("updated");
});

//api to delete one friend from database
app.delete("/delete", async (req, res) => {
  const id = req.body.id;

  try {
    await FriendModel.deleteOne({ _id: id });
  } catch (err) {
    console.log(err);
  }

  res.send("deleted");
});

//listening on port
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
