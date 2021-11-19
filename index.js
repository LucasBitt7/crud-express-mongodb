// config inicial
const express = require("express");
const app = express();
require("dotenv").config();
// depois do db
const mongoose = require("mongoose");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//rotas
const personRoutes = require("./routes/personRoutes.js");

app.use("/person", personRoutes);

//initial routes and endpoints motherfocka
app.get("/", (req, res) => {
  res.json({ message: "hi" });
});

///entragando uma porta
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.3cois.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("connected on mongodb! :)");
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  });
