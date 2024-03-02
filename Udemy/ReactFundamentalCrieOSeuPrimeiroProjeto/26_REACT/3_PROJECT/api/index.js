import express from "express";
const PORT = 5000;

const path = require("path");
const fs = require("fs");
const cors = require('cors')
const app = express();

// Enable All CORS Requests
app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get("/", (req, res) => res.json({status: "NTask API"}));

app.get("/todos", (req, res) => {
	try {
		const fullPath = path.resolve("../todo/data/db.json");
		const data = fs.readFileSync(fullPath);
		const db = JSON.parse(data);
		const pretty = JSON.stringify(db)
		res.setHeader("Content-Type", "application/json")
		res.send(pretty)
	} catch (err) {
		console.log("Error fs readFile: " + err.message)
		res.status(500).send({
		message: "Error getting todos."
		})
	}
});

app.post("/todos", (req, res) => {
	try {
		const fullPath = path.resolve("../todo/data/db.json");
		const data = fs.readFileSync(fullPath);
		var db = JSON.parse(data);
		const todo = req.body
		db['todos'].push(todo);
		fs.writeFileSync(fullPath, JSON.stringify(db, null, 4));
		res.setHeader("Content-Type", "application/json")
		res.end(JSON.stringify({'message': 'Done', 'code': 'SUCCESS'}));
	} catch (err) {
		console.log("Error fs writeFile: " + err.message)
		res.status(500).send({
		  message: "Error postting todos."
		})
	}
});

app.delete('/todos/:todoId', function(req, res) {
	const todoId = req.params.todoId;
	const fullPath = path.resolve("../todo/data/db.json");
	const data = fs.readFileSync(fullPath);
	var db = JSON.parse(data);
	db['todos'] = db['todos'].filter(todo => String(todo.id) != todoId)
	fs.writeFileSync(fullPath, JSON.stringify(db, null, 4));
	res.setHeader("Content-Type", "application/json")
	res.end(JSON.stringify({'message': 'Done', 'code': 'SUCCESS'}));
});

app.put('/todos/:todoId', function(req, res) {
	const todoId = req.params.todoId;
	const fullPath = path.resolve("../todo/data/db.json");
	const data = fs.readFileSync(fullPath);
	var db = JSON.parse(data);
	db['todos'] = db['todos'].map(todo => {
		if (String(todo.id) == todoId) {
			todo.done = !todo.done;
		}

		return todo;
	});
	fs.writeFileSync(fullPath, JSON.stringify(db, null, 4));
	res.setHeader("Content-Type", "application/json")
	res.end(JSON.stringify({'message': 'Done', 'code': 'SUCCESS'}));
});

app.listen(PORT, () => console.log(`NTask API - porta ${PORT}`));
