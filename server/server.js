const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// // Connect to MongoDB
mongoose.connect("mongodb+srv://root:root@rupakstephenxyz.auj1iea.mongodb.net/?retryWrites=true&w=majority").then(() => {console.log("Connection to DB Established")})

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const ratingSchema = new mongoose.Schema({
  media_name: String,
  media_type: String,
  rating: Number,
  review_str: String,
  tags: Array,
  date: Date,
  completed: Boolean,
});

const ratingReview = mongoose.model("Rating", ratingSchema)

const testReview = new ratingReview({
  media_name:"Testing",
  media_type:"Test",
  rating:10,
  tags:["Teher","meher"],
  date:"10/31/2023",
  completed:true,
  review_str:"Testing that this reivew actually works"
})

testReview.save().then(() => console.log("Hello"))

app.get("/reviews/all", async function (req, res) {
  let results = await ratingReview.find({})
  res.send(results)
})