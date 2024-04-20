const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// // Connect to MongoDB
mongoose.connect("mongodb+srv://root:<password>@rupakstephenxyz.auj1iea.mongodb.net/?retryWrites=true&w=majority");

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const todoSchema = new mongoose.Schema({
//     task: String,
//     completed: Boolean,
//   });

// const Todo = mongoose.model('Todo', todoSchema);