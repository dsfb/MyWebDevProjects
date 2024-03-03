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

const fullPath = path.resolve("../todo/data/db.json");

function saveDB(db) {
	try {
		fs.writeFileSync(fullPath, JSON.stringify(db, null, 4));
		return [undefined, true]
	} catch (err) {
		console.log("Error fs writeFile: " + err.message)
		return [undefined, false]
	}
}

function readDB() {
	try {
		const data = fs.readFileSync(fullPath);
		return [JSON.parse(data), true]
	} catch (err) {
		console.log("Error fs readFile: " + err.message)
		return [undefined, false]
	}
}

app.get("/todos", (req, res) => {
	const array = readDB();
	if (!array[1]) {
		return res.status(500).send({
			message: "Error getting todos."});
	}

	const db = array[0];
	const pretty = JSON.stringify(db);
	res.setHeader("Content-Type", "application/json");
	res.send(pretty);
});

app.post("/todos", (req, res) => {
	let array = readDB();
	if (!array[1]) {
		return res.status(500).send({
			message: "Error posting todo."});
	}

	var db = array[0];
	const todo = req.body;
	db['todos'].push(todo);
	array = saveDB(db);
	if (!array[1]) {
		return res.status(500).send({
			message: "Error posting todo."});
	}

	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({'message': 'Done', 'code': 'SUCCESS'}));
});

app.delete('/todos/:todoId', function(req, res) {
	const todoId = req.params.todoId;
	let array = readDB();
	if (!array[1]) {
		return res.status(500).send({
			message: "Error deleting todo."});
	}

	var db = array[0];
	db['todos'] = db['todos'].filter(todo => String(todo.id) != todoId);
	array = saveDB(db);
	if (!array[1]) {
		return res.status(500).send({
			message: "Error deleting todo."});
	}

	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({'message': 'Done', 'code': 'SUCCESS'}));
});

app.put('/todos/:todoId', function(req, res) {
	const todoId = req.params.todoId;
	let array = readDB();
	if (!array[1]) {
		return res.status(500).send({
			message: "Error putting todo."});
	}

	var db = array[0];
	db['todos'] = db['todos'].map(todo => {
		if (String(todo.id) == todoId) {
			todo.done = !todo.done;
		}

		return todo;
	});

	array = saveDB(db);
	if (!array[1]) {
		return res.status(500).send({
			message: "Error deleting todo."});
	}

	res.setHeader("Content-Type", "application/json")
	res.end(JSON.stringify({'message': 'Done', 'code': 'SUCCESS'}));
});

app.listen(PORT, () => console.log(`NTask API - porta ${PORT}`));
