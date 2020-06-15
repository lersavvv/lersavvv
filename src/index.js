const express = require("express");
var bodyParser = require("body-parser");
let moment = require("moment-timezone");
const app = express();
app.use(bodyParser.json());
app.listen(8080);
let mass = [
  {
    id: 1,
    firstName: "Ivan",
    lastName: "Ivanov",
    group: "VIS22",
    createdAt: "2020-03-02 12:41:09", // дата создания
    updatedAt: "2020-03-02 12:45:02" // дата редактирования
  },
  {
    id: 2,
    firstName: "Vasa",
    lastName: "Vailev",
    group: "VIS22",
    createdAt: "2020-03-02 12:41:09", // дата создания
    updatedAt: "2020-03-02 12:45:02" // дата редактирования
  },
  {
    id: 3,
    firstName: "Sergey",
    lastName: "Sergeevich",
    group: "VIS23",
    createdAt: "2020-03-02 12:41:09", // дата создания
    updatedAt: "2020-03-02 12:45:02" // дата редактированиядата редактирования
  }
];

app.get("/students", function(req, res) {
  res.send(mass);
  res.end();
});

app.get("/students/:id", function(req, res) {
  res.send(
    mass.find(function Search(element, index, array) {
      if (
        element.id ===
        Number(req.url.slice(req.url.indexOf("students") + 9, req.url.length))
      ) {
        return element;
      } else return false;
    })
  );
  res.end();
});

app.post("/students", function(req, res) {
  let newStud = {
    id: mass.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    group: req.body.group,
    createdAt: moment()
      .tz("Europe/Moscow")
      .format("YYYY-MM-DD HH:mm:ss"), // дата создания
    updatedAt: moment()
      .tz("Europe/Moscow")
      .format("YYYY-MM-DD HH:mm:ss")
  };
  mass.push(newStud);
  res.send(mass);
  res.end();
});

app.put("/students/:id", function(req, res) {
  let index = mass.findIndex(function Search(element, index, array) {
    if (
      element.id ===
      Number(req.url.slice(req.url.indexOf("students") + 9, req.url.length))
    ) {
      return element;
    } else return false;
  });
  mass[index] = {
    id: mass[index].id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    group: req.body.group,
    createdAt: mass[index].createdAt,
    updatedAt: moment()
      .tz("Europe/Moscow")
      .format("YYYY-MM-DD HH:mm:ss")
  };
  res.send(mass);
  res.end();
});

app.delete("/students/:id", function(req, res) {
  mass.splice(
    mass.findIndex(function Search(element, index, array) {
      if (
        element.id ===
        Number(req.url.slice(req.url.indexOf("students") + 9, req.url.length))
      ) {
        return element;
      } else return false;
    }),
    1
  );
  res.send(mass);
  res.end();
});
