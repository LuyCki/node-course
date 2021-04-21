// const http = require('http');

// const hostname = 'localhost';
// const port = 5000;

// const server = http.createServer((request, response) => {
//     response.statusCode = 200;
//     response.statusMessage = 'Orice';
//     response.setHeader('Content-Type', 'text/plain')

//     response.end('Hello World!asdasdasdas');
// })

// server.listen(port, hostname, () => {
//     console.log(`Server started on http://${hostname}:${port}`);
// });

const express = require("express");

const app = express();
const port = 5000;

app.use(express.json());

let todoList = [
  {
    id: 0,
    text: "First todo",
    completed: false,
  },
  {
    id: 1,
    text: "Second todo",
    completed: true,
  },
];

app.get("/todos", (req, res) => {
  res.send(todoList);
});

app.get("/todos/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const todoObj = todoList.find((todo) => todo.id === Number(todoId));

  if (!todoObj) {
    res.statusCode = 404;
    res.send("Not found!");
  }

  res.send(todoObj);
});

app.post("/todos", (req, res) => {
  if (!req.body) {
    res.statusCode = 406;
    res.send("The inputs must be!");
  }

  if (typeof req.body.text !== "string") {
    res.statusCode = 406;
    res.send("The text must be string!");
  }

  if (typeof req.body.completed !== "boolean") {
    res.statusCode = 406;
    res.send("The text must be boolean!");
  }

  const todoPayload = {
    id: todoList.length,
    text: req.body.text,
    completed: req.body.completed,
  };

  todoList.push(todoPayload);

  res.status = 201;
  res.send(todoPayload);
});

app.put("/todos/:todoId", (req, res) => {
  const todoId = req.params.todoId;

  if (req.body) {
    res.statusCode = 406;
    res.send("The inputs must be!");
  }

  if (typeof req.body.text !== "string") {
    res.statusCode = 406;
    res.send("The text must be string!");
  }

  if (typeof req.body.completed !== "boolean") {
    res.statusCode = 406;
    res.send("The text must be boolean!");
  }

  todoList[todoId].text = req.body.text;
  todoList[todoId].completed = req.body.completed;

  res.send(todoList);
});

app.delete("/todos/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const todoDeleted = todoList.splice(todoId, 1);

  if (todoDeleted.length === 0) {
    res.statusCode = 404;
    res.send("Not found!");
  }

  res.send(todoList);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
