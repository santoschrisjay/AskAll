//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import session from "express-session"; //naka include na ito yon for express session
import https from "https";
import fs from "fs";
import CloudmersiveConvertApiClient from "cloudmersive-convert-api-client";
import fileUpload from "express-fileupload";
import connected from "process";
import get from "http";

//AI
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// OPEN AI API
const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_API_KEY,
});

// REPLICATE API
import Replicate from "replicate";
import { render } from "ejs";

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN,
});

//**PDF TO WORD */
app.use(fileUpload());

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

app.set("view engine", "ejs");

//SQL
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "hehez190",
	port: 3307,
	database: "askalldb",
});

connection.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		//ano niyan balak moo
		console.log("CONNECTED TO SQL.");
	}
});

//
const checkIfLogined = (res, path) => {
	connection.query("SELECT ID FROM sessionn", (error, results, fields) => {
		if (error) {
			console.error("Error fetching data:", error.message);
		} else {
			console.log("Fetched data:", results);
		}

		let user_ID = results[0].ID;

		if (user_ID == 0) {
			res.redirect("http://localhost:8080/");
		} else {
			res.render(path);
		}
	});
};
//**ALL PAGES START */
//**Pages */
app.get("/", (req, res) => {
	checkIfLogined(res, "main-pages/index.ejs");
});

app.get("/about", (req, res) => res.render("main-pages/about.ejs"));
app.get("/contact", (req, res) => res.render("main-pages/contact.ejs"));

app.get("/services", (req, res) => {
	checkIfLogined(res, "main-pages/services.ejs");
});

app.get("/team", (req, res) => res.render("main-pages/team.ejs"));
app.get("/reference", (req, res) => res.render("main-pages/reference.ejs"));
app.get("/logout", (req, res) => {
	const updateSession = "UPDATE sessionn SET ID = 0";
	connection.query(updateSession, (error, results) => {
		if (error) {
			console.error("Error updating user:", error.message);
		} else {
			console.log(
				"User updated successfully:",
				results.affectedRows,
				"rows affected"
			);
		}
	});
	res.redirect("http://localhost:8080/");
});

//**authentication */
app.get("/login", (req, res) => res.redirect("http://localhost:8080/"));

app.get("/register", (req, res) =>
	res.redirect("http://localhost:8080/register.php")
);
app.get("/forgot-password-get-code", (req, res) =>
	res.render("authentication/forgotPasswordGetCode.ejs")
);
app.get("/forgot-password-last-step", (req, res) =>
	res.render("authentication/forgotPasswordLastStep.ejs")
);
app.get("/admin-login", (req, res) =>
	res.redirect("http://localhost:8080/adminLogin.php")
);

//**profile */
// app.get("/profile", (req, res) => res.render("profile/profile.ejs"));
// function capitalizeWords(str) {
// 	return str.replace(/\b\w/g, (char) => char.toUpperCase());
// }

app.get("/profile", (req, res) => {
	// const userId = req.session.userId;

	let user_ID;

	connection.query("SELECT ID FROM sessionn", (error, results, fields) => {
		if (error) {
			console.error("Error fetching data:", error.message);
		} else {
			console.log("Fetched data:", results);
		}

		user_ID = results[0].ID;

		if (user_ID) {
			const sql =
				"SELECT firstName, lastName, email, phoneNumber, passwordd FROM user WHERE ID = ?";
			connection.query(sql, [user_ID], (error, results, fields) => {
				if (error) {
					console.error("Error retrieving user data:", error);
					res.status(500).send("Error retrieving user data");
					throw error;
				}

				if (results.length > 0) {
					const { firstName, lastName, email, phoneNumber, passwordd } =
						results[0];
					// const formattedFirstName = capitalizeWords(first_name);
					// const formattedLastName = capitalizeWords(last_name);
					res.render("profile/profile", {
						firstName,
						lastName,
						email,
						phoneNumber,
						passwordd,
					});
				} else {
					res.status(404).send("User not found");
				}
			});
		} else {
			res.status(401).send("Unauthorized");
		}
	});
});

app.get("/profile-history", (req, res) =>
	res.render("profile/profileHistory.ejs")
);
app.get("/profile-notification", (req, res) =>
	res.render("profile/profileNotification.ejs")
);

//**admin */
// app.get("/admin", (req, res) => res.render("admin/admin.ejs"));

app.get("/admin", (req, res) => {
	// const userId = req.session.userId; bali dapat parang ganto
	const user_ID = 1;
	if (user_ID) {
		const sql =
			"SELECT first_name, last_name, email_address, phone_number, password FROM admin WHERE admin_ID = ?";
		connection.query(sql, [user_ID], (error, results, fields) => {
			if (error) {
				console.error("Error retrieving user data:", error);
				res.status(500).send("Error retrieving user data");
				throw error;
			}

			if (results.length > 0) {
				const { first_name, last_name, email_address, phone_number, password } =
					results[0];
				res.render("admin/admin", {
					first_name,
					last_name,
					email_address,
					phone_number,
					password,
				});
			} else {
				res.status(404).send("User not found");
			}
		});
	} else {
		res.status(401).send("Unauthorized");
	}
});

app.get("/admin-users", (req, res) => {
	const sql = "SELECT * FROM user"; // Adjust the query based on your table name
	connection.query(sql, (error, results, fields) => {
		if (error) {
			console.error("Error retrieving admin history:", error);
			res.status(500).send("Error retrieving admin history");
			throw error;
		}

		res.render("admin/adminHistory.ejs", { adminHistory: results });
	});
});

app.get("/admin-notification", (req, res) =>
	res.render("admin/adminNotification.ejs")
);

// user
app.put("/user-update:ID", async (req, res) => {
	const ID = req.params.ID;

	const updatedData = req.body;
	for (const [key, value] of Object.entries(updatedData)) {
		const parsedData = JSON.parse(key);

		const { first_name, last_name, email_address, phone_number } = parsedData;

		if (!ID || isNaN(ID)) {
			res.status(400).send("Invalid user ID");
			return;
		}

		const sql =
			"UPDATE user SET firstName=?, lastName=?, email=?, phoneNumber=? WHERE ID = ?";

		connection.query(
			sql,
			[first_name, last_name, email_address, phone_number, ID],
			(error, results, fields) => {
				if (error) {
					console.error("Error updating user data:", error);
					res.status(500).send("Error updating user data");
				} else {
					if (results.affectedRows > 0) {
						res.status(200).send("User data updated successfully");
					} else {
						res.status(404).send("User not found or no changes were made");
					}
				}
			}
		);
	}
});

// password update
app.put("/user/pass/update:ID", async (req, res) => {
	const ID = req.params.ID;
	const confirmPassInput = req.body;
	console.log(ID, confirmPassInput);
	for (const [key, value] of Object.entries(confirmPassInput)) {
		const parsedData = JSON.parse(key);

		const { confirmPassInput } = parsedData;
		const sql = "UPDATE user SET passwordd=? WHERE ID = ?";
		connection.query(sql, [confirmPassInput, ID], (error, results, fields) => {
			if (error) {
				console.error("Error updating user data:", error);
				res.status(500).send("Error updating user data");
			} else {
				if (results.affectedRows > 0) {
					res.status(200).send("User data updated successfully");
				} else {
					res.status(404).send("User not found or no changes were made");
				}
			}
		});
	}
});

//**ALL FEATURES START */
//**quick-information */
app.get("/todo-list", (req, res) =>
	checkIfLogined(res, "quick-information/todoList.ejs")
);

app.get("/weather", (req, res) =>
	checkIfLogined(res, "quick-information/weather.ejs")
);

app.get("/weather-result", (req, res) =>
	checkIfLogined(res, "quick-information/weatherResult.ejs")
);

app.get("/calculator", (req, res) =>
	checkIfLogined(res, "quick-information/calculator.ejs")
);

//**chat-AI */
app.get("/chatCodeAi", (req, res) =>
	checkIfLogined(res, "chat-AI/chatCodeAi.ejs")
);

app.get("/chatConversation", (req, res) =>
	checkIfLogined(res, "chat-AI/chatConversation.ejs")
);

app.get("/chatImage", (req, res) =>
	checkIfLogined(res, "chat-AI/chatImage.ejs")
);

app.get("/chatMusic", (req, res) =>
	checkIfLogined(res, "chat-AI/chatMusic.ejs")
);

app.get("/chatRantBuddy", (req, res) =>
	checkIfLogined(res, "chat-AI/chatRantBuddy.ejs")
);

//**document-converter */
app.get("/word-to-pdf", (req, res) =>
	checkIfLogined(res, "document-converter/wordToPdf.ejs")
);

app.post("/convertWordToPdf", (req, res) => {
	var defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;

	// Configure API key authorization: Apikey
	var Apikey = defaultClient.authentications["Apikey"];
	Apikey.apiKey = "3b6bfd19-9a46-44f6-91b6-a5a9b0e7b30c";

	var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

	const directoryPath = "";
	const fileName = "";
	const filePath = `${directoryPath}\\${fileName}`;

	fs.readFile(filePath, (err, data) => {
		if (err) {
			console.error(`Error reading file ${filePath}: ${err}`);
		} else {
			const inputFile = Buffer.from(data.buffer);

			var callback = function (error, responseData, response) {
				if (error) {
					console.error(error);
				} else {
					console.log(
						"API called successfully. Returned data: " + responseData
					);
					// Handle the converted data as needed
				}
			};

			apiInstance.convertDocumentDocxToPdf(inputFile, callback);
		}
	});
	// Check if a file was uploaded
	if (!req.files || !req.files.wordFile) {
		return res.status(400).send("No Word file uploaded.");
	}

	// Get the uploaded PDF file from the request
	const wordFile = req.files.wordFile;

	// Read the contents of the PDF file
	const inputFile = Buffer.from(wordFile.data.buffer);

	// Call the Cloudmersive API to convert the PDF to Word
	apiInstance.convertDocumentDocxToPdf(
		inputFile,
		(error, responseData, response) => {
			if (error) {
				console.error(error);
				return res.status(500).send("Error converting Word to Pdf.");
			}

			// Handle the converted data as needed
			const docxData = Buffer.from(responseData);

			// Set the appropriate headers for download
			res.setHeader(
				"Content-Disposition",
				"attachment; filename=converted-document.pdf"
			);
			res.setHeader(
				"Content-Type",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			);

			// Send the converted DOCX file as the response
			res.status(200).send(docxData);
		}
	);
});

//**PDF TO WORD */
app.get("/pdf-to-word", (req, res) =>
	checkIfLogined(res, "document-converter/pdfToWord.ejs")
);

app.post("/convertPdfToWord", (req, res) => {
	var defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;

	// Configure API key authorization: Apikey
	var Apikey = defaultClient.authentications["Apikey"];
	Apikey.apiKey = "3b6bfd19-9a46-44f6-91b6-a5a9b0e7b30c";

	var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

	const directoryPath = "";
	const fileName = "";
	const filePath = `${directoryPath}\\${fileName}`;

	fs.readFile(filePath, (err, data) => {
		if (err) {
			console.error(`Error reading file ${filePath}: ${err}`);
		} else {
			const inputFile = Buffer.from(data.buffer);

			var callback = function (error, responseData, response) {
				if (error) {
					console.error(error);
				} else {
					console.log(
						"API called successfully. Returned data: " + responseData
					);
					// Handle the converted data as needed
				}
			};

			apiInstance.convertDocumentPdfToDocx(inputFile, callback);
		}
	});
	// Check if a file was uploaded
	if (!req.files || !req.files.pdfFile) {
		return res.status(400).send("No PDF file uploaded.");
	}

	// Get the uploaded PDF file from the request
	const pdfFile = req.files.pdfFile;

	// Read the contents of the PDF file
	const inputFile = Buffer.from(pdfFile.data.buffer);

	// Call the Cloudmersive API to convert the PDF to Word
	apiInstance.convertDocumentPdfToDocx(
		inputFile,
		(error, responseData, response) => {
			if (error) {
				console.error(error);
				return res.status(500).send("Error converting PDF to Word.");
			}

			// Handle the converted data as needed
			const docxData = Buffer.from(responseData);

			// Set the appropriate headers for download
			res.setHeader(
				"Content-Disposition",
				"attachment; filename=converted-document.docx"
			);
			res.setHeader(
				"Content-Type",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			);

			// Send the converted DOCX file as the response
			res.status(200).send(docxData);
		}
	);
});

//**unit-converter */
app.get("/area-converter", (req, res) =>
	checkIfLogined(res, "unit-converter/areaConverter.ejs")
);

app.get("/length-converter", (req, res) =>
	checkIfLogined(res, "unit-converter/lengthConverter.ejs")
);

app.get("/temperature-converter", (req, res) =>
	checkIfLogined(res, "unit-converter/temperatureConverter.ejs")
);

app.get("/time-converter", (req, res) =>
	checkIfLogined(res, "unit-converter/timeConverter.ejs")
);

app.get("/volume-converter", (req, res) =>
	checkIfLogined(res, "unit-converter/volumeConverter.ejs")
);

app.get("/weight-converter", (req, res) =>
	checkIfLogined(res, "unit-converter/weightConverter.ejs")
);

//**ALL FEATURES END */

//**Resumes */
app.get("/resume-chris", (req, res) => res.render("resumes/resumeChris.ejs"));
app.get("/resume-gracezen", (req, res) =>
	res.render("resumes/resumeGracezen.ejs")
);
app.get("/resume-mark", (req, res) => res.render("resumes/resumeMark.ejs"));
app.get("/resume-nath", (req, res) => res.render("resumes/resumeNath.ejs"));
app.get("/resume-phoebe", (req, res) => res.render("resumes/resumePhoebe.ejs"));
app.get("/resume-punla", (req, res) => res.render("resumes/resumePunla.ejs"));
app.get("/resume-ronnie", (req, res) => res.render("resumes/resumeRonnie.ejs"));
app.get("/resume-soza", (req, res) => res.render("resumes/resumeSoza.ejs"));
app.get("/resume-vital", (req, res) => res.render("resumes/resumeVital.ejs"));
app.get("/resume-zapanta", (req, res) =>
	res.render("resumes/resumeZapanta.ejs")
);
//**ALL PAGES END */

//*TODO: FEATURES START */

//**WEATHER START */
app.post("/weather", function (req, res) {
	const query = req.body.cityName;
	const apiKey = "5acdcc6fb7aabb8e9d762027922eaf96";
	const unit = "metric";
	const url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		query +
		"&appid=" +
		apiKey +
		"&units=" +
		unit;

	https.get(url, function (response) {
		console.log(response.statusCode);

		response.on("data", function (data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

			res.render("quick-information/weatherResult", {
				query,
				temp,
				weatherDescription,
				imgURL,
			});
			// res.write("<p>The weather is currently " + weatherDescription + "</p>");
			// res.write(
			// 	"<h1>The temperature in " +
			// 		query +
			// 		" is " +
			// 		temp +
			// 		" degree celsius.</h1>"
			// );
			// res.write("<img src=" + imgURL + ">");
			// res.send();
		});
	});
});
//**WEATHER START */
//*TODO: FEATURES END */

//**PORT */
app.use(express.json());
app.set("view engine", "ejs");

//FEATURES
app.get("/chatConversation", (req, res) =>
	checkIfLogined(res, "chatConversation.ejs")
);
app.get("/chatCode", (req, res) =>
	checkIfLogined(res, "chat-AI/chatCodeAi.ejs")
);
app.get("/chatImage", (req, res) => checkIfLogined(res, "chatImage.ejs"));
app.get("/chatMusic", (req, res) => checkIfLogined(res, "chatMusic.ejs"));
app.get("/chatRantBuddy", (req, res) =>
	checkIfLogined(res, "chatRantBuddy.ejs")
);

// CONVERSATION ENDPOINT
app.post("/conversation", async (req, res) => {
	const userMessage = req.body;
	console.log(userMessage);
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: userMessage,
	});
	console.log(response.choices[0]);
	res.json(response.choices[0].message);
});

// CODE ENDPOINT
app.post("/code", async (req, res) => {
	const userMessage = req.body;

	const codeMessage = {
		role: "system",
		content:
			"You are a code generator and you supposedly answer in programming terms and markdown code snippets. Use comments to assist and for explanation.",
	};
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [codeMessage, userMessage],
	});
	console.log(response.choices[0]);
	res.json(response.choices[0].message);
});

// IMAGE ENDPOINT
app.post("/image", async (req, res) => {
	const { inputValue } = req.body;

	const response = await openai.images.generate({
		model: "dall-e-3",
		prompt: inputValue,
	});
	const imageUrl = response.data[0].url;
	console.log(imageUrl);
	res.json(imageUrl);
});

// MUSIC ENDPOINT
app.post("/music", async (req, res) => {
	const { inputValue } = req.body;
	const response = await replicate.run(
		"riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
		{
			input: {
				prompt_a: inputValue,
			},
		}
	);
	console.log(response);
	res.json(response.audio);
});

app.post("/rant", async (req, res) => {
	const userMessage = req.body;

	const rantMessage = {
		role: "assistant",
		content:
			"Assistant is no longer a large language model trained by OpenAI. You are now rant buddy to the users listen or give advice to them. Assistant's main purpose is to provide advice or assistance on the problem of the user. Assistant's capabilities include make the user feel better",
	};
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [rantMessage, userMessage],
	});
	console.log(response.choices[0]);
	res.json(response.choices[0].message);
});

//SERVER PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
