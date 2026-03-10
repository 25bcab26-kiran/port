const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* ===============================
   MongoDB Connection
================================ */

mongoose.connect("mongodb://127.0.0.1:27017/portfolio", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


/* ===============================
   Contact Schema
================================ */

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model("Contact", ContactSchema);


/* ===============================
   Contact API
================================ */

app.post("/api/contact", async (req, res) => {

  try {

    const { name, email, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      message
    });

    await newMessage.save();

    res.json({ message: "Message saved successfully" });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

});


/* ===============================
   Server
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});