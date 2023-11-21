//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import session from "express-session";
import OpenAI from 'openai';
const app = express();


const openai = new OpenAI({
    apiKey:"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"

});

app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: true,
	})
);

const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

//PAGES
app.get("/", (req, res) => res.render("index.ejs"));
app.get("/about", (req, res) => res.render("about.ejs"));
app.get("/contact", (req, res) => res.render("contact.ejs"));
app.get("/service", (req, res) => res.render("service.ejs"));
app.get("/team", (req, res) => res.render("team.ejs"));
app.get("/profile", (req, res) => res.render("profile.ejs"));
app.get("/reference", (req, res) => res.render("reference.ejs"));

//FEATURES
app.get("/todo", (req, res) => res.render("todo.ejs"));
app.get("/weather", (req, res) => res.render("weather.ejs"));
app.get("/chatAI", (req, res) => res.render("chatAI.ejs"));
app.get("/calculator", (req, res) => res.render("calculator.ejs"));
app.get("/wordToPdf", (req, res) => res.render("wordToPdf.ejs"));
app.get("/pdfToWord", (req, res) => res.render("pdfToWord.ejs"));
app.get("/converter", (req, res) => res.render("converter.ejs"));

//RESUMES
app.get("/resumeChris", (req, res) => res.render("resumes/resumeChris.ejs"));
app.get("/resumeGracezen", (req, res) =>
	res.render("resumes/resumeGracezen.ejs")
);
app.get("/resumeMark", (req, res) => res.render("resumes/resumeMark.ejs"));
app.get("/resumeNath", (req, res) => res.render("resumes/resumeNath.ejs"));
app.get("/resumePhoebe", (req, res) => res.render("resumes/resumePhoebe.ejs"));
app.get("/resumePunla", (req, res) => res.render("resumes/resumePunla.ejs"));
app.get("/resumeRonnie", (req, res) => res.render("resumes/resumeRonnie.ejs"));
app.get("/resumeSoza", (req, res) => res.render("resumes/resumeSoza.ejs"));
app.get("/resumeVital", (req, res) => res.render("resumes/resumeVital.ejs"));
app.get("/resumeZapanta", (req, res) =>
	res.render("resumes/resumeZapanta.ejs")
);

// API ROUTE
app.post('/conversation', async (req, res) => {
const userMessage = req.body
	console.log(userMessage)
	const response = await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
		messages: userMessage,
	   
    });
		console.log(response.choices[0])
		res.json(response.choices[0].message);
})



//SERVER PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
