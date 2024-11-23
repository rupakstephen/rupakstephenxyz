const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const DB_MEDIUM = process.env.DB_MEDIUM || "local"
const DB_PORT = process.env.DB_PORT || 27017;
const PORT = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "root";
const DB_URL = process.env.DB_URL || "127.0.0.1";

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log("DB Medium: " + DB_MEDIUM)
// // Connect to MongoDB
var connect_url = "";
if (DB_MEDIUM == "local"){
    // local connection to docker container
    connect_url = `mongodb://${DB_URL}:${DB_PORT}`
} else {
    // remote connection to atlas
    connect_url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/?retryWrites=true&w=majority`
}
console.log(connect_url)
mongoose.connect(connect_url).then(() => {console.log("Connection to DB Established")})

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const ratingSchema = new mongoose.Schema({
  review_id: String, 
  media_name: String,
  media_type: String,
  rating: Number,
  review_str: String,
  tags: Array,
  date: Date,
  completed: Boolean,
});

const ratingReview = mongoose.model("Rating", ratingSchema)

app.get("/reviews", async function (req, res) {
  let results = await ratingReview.find({})
  res.send(results)
})

app.post("/reviews", async function (req, res) {
  let review_entry_id = uuidv4();
  const review_entry = new ratingReview({
      review_id: review_entry_id,
      media_name: req.body["media_name"],
      media_type: req.body["media_type"],
      rating: req.body["rating"],
      tags: req.body["tags"],
      date: req.body["date"],
      completed: req.body["completed"],
      review_str: req.body["review_str"]
  })

  review_entry.save().then(
      // success
      () => res.status(200).send({
        "msg": `Review has been submitted for ${req.body["media_name"]}.`,
        "id": review_entry_id
      }),
      // error
      (e) => res.status(500).send({
        "msg":`Review has not been submitted because: ${e}`
      })
  )
})

app.delete("/reviews", async function (req, res) {
  ratingReview.deleteMany().then(
    // success
    () => res.status(200).send(`All reviews have been cleared out.`),
    // error
    (e) => res.status(500).send(`Review has not been submitted because: ${e}`)
  )
})
