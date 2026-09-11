require("dotenv").config();

const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

const app = express();

const port = 8089;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

//creating connection...
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//testing connection...
connection.connect((err) => {
  if (err) throw err;

  console.log("Database connected succesfully...");
});

//Home route
app.get("/", (req, res) => {
  let q = "SELECT count(*) as count FROM user";
  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    let count = result[0]["count"];
    res.render("Home", { count });
  });
});

//create user form route
app.get("/user/add", (req, res) => {
  res.render("add");
});

//create user route
app.post("/user", (req, res) => {
  let id = uuidv4();
  let {username, email, password} = req.body;
  let q = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;
  connection.query(q, [id, username, email, password], (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    res.redirect("/user");
    console.log(result);
  }); 
  console.log({id, username, email, password});
});

//Show users route
app.get("/user", (req, res) => {
  let q = `SELECT id, username, email FROM user`;
  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return req.status(500).send(err);
    }
    res.render("showUsers", { users: result });
  });
});

//Edit form route
app.get("/user/:id/edit", (req, res) => {
  let id = req.params.id;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.render("edit", { users: result[0] });
  });
});

//update route
app.patch("/user/:id", (req, res) => {
  let id = req.params.id;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  let { username: newUsername, password: pass } = req.body;
  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    let user = result[0];
    if (pass != user.password) {
      res.send("Incorrect Pawword");
    } else {
      let updateQ = `UPDATE user SET username = '${newUsername}' WHERE id='${id}'`;
      connection.query(updateQ, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        res.redirect("/user");
      });
    }
  });
});

//delete route
app.delete("/user/:id", (req, res) => {
  let id = req.params.id;
  let q = `DELETE FROM user WHERE id='${id}'`;
  connection.query(q, (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    res.redirect("/user");
  });
})

//closing connection...
// connection.end();

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
