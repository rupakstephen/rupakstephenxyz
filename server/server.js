const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// // Connect to MongoDB
mongoose.connect("mongodb+srv://root:root@rupakstephenxyz.auj1iea.mongodb.net/");

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const ratingSchema = new mongoose.Schema({
  media_name: String,
  media_type: String,
  rating: Number,
  review: String,
  tags: Array,
  date: Date,
  completed: Boolean,
});

const ratingReview = mongoose.model("Rating", ratingSchema)

// const testReview = new ratingReview({
//   media_name:"Testing",
//   media_type:"Test",
//   rating:10,
//   tags:["Teher","meher"],
//   date:"10/31/2023",
//   completed:true
// })

// testReview.save().then(() => console.log("Hello"))