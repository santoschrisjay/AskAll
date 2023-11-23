//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import session from "express-session";
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

// OPEN AI API
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,

});

// REPLICATE API 
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: true,
	})
);

const port = 3000;

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
app.get("/chatConversation", (req, res) => res.render("chatConversation.ejs"));
app.get("/chatCode", (req, res) => res.render("chatCodeAi.ejs"));
app.get("/chatImage", (req, res) => res.render("chatImage.ejs"));
app.get("/chatMusic", (req, res) => res.render("chatMusic.ejs"));
app.get("/chatRantBuddy", (req, res) => res.render("chatRantBuddy.ejs"));
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
// CONVERSATION ENDPOINT
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

// CODE ENDPOINT
app.post('/code', async (req, res) => {
	const userMessage = req.body

		const codeMessage = {
			role: "system",
			content:"You are a code generator and you supposedly answer in programming terms and markdown code snippets. Use comments to assist and for explanation."
		}
		const response = await openai.chat.completions.create({
			model:"gpt-3.5-turbo",
			messages:[codeMessage, userMessage]
		   
		});
			console.log(response.choices[0])
			res.json(response.choices[0].message);
	})
	
// IMAGE ENDPOINT
	app.post('/image', async (req, res) => {
		const {inputValue}= req.body
		const kekw = Object.values(inputValue[0])
		
		const response =await openai.images.generate({ 
			model: "dall-e-3", 
			prompt: inputValue,
		
		});
		const imageUrl = response.data[0].url
        console.log(imageUrl); 
    res.json(imageUrl);
		})
		


	// MUSIC ENDPOINT
	app.post('/music', async (req, res) => {
		const {inputValue}= req.body
		const response = await replicate.run(
			"riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
			{
			  input: {
				prompt_a:inputValue,
			  },
			}
		  );
			console.log(response)
    res.json(response.audio);
		})


		app.post('/rant', async (req, res) => {
			const userMessage = req.body
		
				const rantMessage = {
					role: "assistant",
					content: "Assistant is no longer a large language model trained by OpenAI. You are now rant buddy to the users listen or give advice to them. Assistant's main purpose is to provide advice or assistance on the problem of the user. Assistant's capabilities include make the user feel better"
				}
				const response = await openai.chat.completions.create({
					model:"gpt-3.5-turbo",
					messages:[rantMessage, userMessage]
				   
				});
					console.log(response.choices[0])
					res.json(response.choices[0].message);
			})



//SERVER PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
