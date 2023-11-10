const express = require("express");
const app = express();
const cors = require("cors");
const Sequelize = require("sequelize");

require("dotenv").config();

const { PORT } = process.env;
const { CONNECTION_URI } = process.env;

app.use(express.json());
app.use(cors());

app.listen(PORT, console.log(`Running @ PORT ${PORT}`));

//sequalize connect to database

const sequelize = new Sequelize(CONNECTION_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

app.get("/allProperties", (req, res) => {
  sequelize.query(`SELECT * FROM properties`).then((dbRes) => {
    console.log(dbRes);
    res.send(dbRes[0]);
  });
});

app.post("/signin", (req, res) => {
  let { username, password } = req.body;

  sequelize
    .query(`SELECT * FROM users WHERE username = '${username}'`)
    .then((dbRes) => {
      let user = dbRes[0][0];
      console.log(dbRes);
      if (password == user.password) {
        res.status(200).send(user);
      } else {
        res.status(401).send("incorrect password");
      }
    });
});

app.post("/register", (req, res) => {
  let { username, password } = req.body;
  sequelize
    .query(
      `INSERT INTO users (username, password) VALUES ('${username}', '${password}') returning username;`
    )
    .then((dbRes) => res.status(200).send(dbRes[0][0]));
});

app.post("/favorite", (req, res) => {
  let { users_id, properties_id } = req.body;
  console.log(req.body);
  users_id = parseInt(users_id);
  properties_id = parseInt(properties_id);
  console.log(req.body);
  sequelize
    .query(
      `INSERT INTO favorites (users_id, properties_id) VALUES (${users_id}, ${properties_id})`
    )
    .then((dbRes) => {
      return res.status(200).send(dbRes[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get(`/favorite/:users_id`, (req, res) => {
  const { users_id } = req.params;
  console.log(req.params);
  sequelize
    .query(
      `SELECT * FROM properties p JOIN favorites f on f.properties_id = p.id Where f.users_id = ${users_id};`
    )
    .then((dbRes) => {
      console.log(dbRes);
      return res.status(200).send(dbRes[0]);
    });
});

app.delete(`/favorite/:users_id/:properties_id`, (req,res) => {
  const { users_id, properties_id } = req.params;
  console.log(req.params)
  sequelize.query(`DELETE from favorites where users_id = ${users_id} and properties_id = ${properties_id};`).then((dbRes) => {
    console.log(dbRes);
    return res.status(200).send(dbRes[0]);
  })
})