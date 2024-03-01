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
		console.log("body: " + request.body);
		console.log("todo: " + request.body.todo);
	    const fullPath = path.resolve("../todo/data/db.json");
		const data = fs.readFileSync(fullPath);
		const db = JSON.parse(data);
	    const pretty = JSON.stringify(db, null, 4)
	    res.setHeader("Content-Type", "application/json")
	    res.send(pretty)
	} catch (err) {
	    console.log("Error fs readFile: " + err.message)
	    res.status(500).send({
	      message: "Error getting todos."
	    })
	}
});

app.listen(PORT, () => console.log(`NTask API - porta ${PORT}`));
