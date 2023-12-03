//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import session from "express-session"; //naka include na ito yon for express session
import https from "https";
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
	password: "weakka12",
	port: 3306,
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
			res.redirect("http://localhost"); // localhost:8000 if hindi nag wwork sayo
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

//ADMIN UPDATES CHENA CHENA
app.post("/update-admin-profile", (req, res) => {
	let firstName = req.body.inputFirstName;
	let lastName = req.body.inputLastName;
	let email = req.body.inputEmailAddress;
	let phoneNumber = req.body.inputPhoneNumber;

	let queryFirstName = `first_name = '${firstName}'`;
	let queryLastName = `last_name = '${lastName}'`;
	let queryEmail = `email_address = '${email}'`;
	let queryPhoneNumber = `phone_number = '${phoneNumber}'`;

	connection.query(
		`UPDATE admin SET ${queryFirstName}, ${queryLastName}, ${queryEmail}, ${queryPhoneNumber}`,
		(error, results) => {
			if (!error) {
				console.log("success");
			}
			res.redirect("http://localhost:3000/admin");
		}
	);
});

app.post("/update-admin-password", (req, res) => {
	let currentPassword = req.body.currentPassword;
	let newPassword = req.body.newPassword;

	connection.query(
		`SELECT admin_ID FROM admin WHERE password = md5('${currentPassword}')`,
		(error, results, fields) => {
			if (results[0]) {
				connection.query(
					`UPDATE admin SET password = md5('${newPassword}')`,
					(error, results) => {
						if (!error) {
							console.log("Success");
						}
					}
				);
			}
			res.redirect("http://localhost:3000/admin");
		}
	);
});

//UPDATE AND DELETE users CHENA CHENA
app.post("/update-user-info", (req, res) => {
	let userID = req.body.userID;
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	let email = req.body.emailAddress;
	let phoneNumber = req.body.phoneNumber;
	let button = req.body.button;

	if (button == "update") {
		let queryFirstName = `firstName = '${firstName}'`;
		let queryLastName = `lastName = '${lastName}'`;
		let queryEmail = `email = '${email}'`;
		let queryPhoneNumber = `phoneNumber = '${phoneNumber}'`;

		connection.query(
			`UPDATE user SET ${queryFirstName}, ${queryLastName}, ${queryEmail}, ${queryPhoneNumber} WHERE ID = ${userID}`,
			(error, results) => {
				if (!error) {
					console.log("success");
				}
				res.redirect("http://localhost:3000/admin-users");
			}
		);
	} else {
		connection.query(
			`DELETE FROM user WHERE ID = ${userID}`,
			(error, results) => {
				if (!error) {
					console.log("Deleted");
				}
				res.redirect("http://localhost:3000/admin-users");
			}
		);
	}
});
//DELETE Users CHENA CHENA

app.get("/about", (req, res) => res.render("main-pages/about.ejs"));
app.get("/contact", (req, res) => res.render("main-pages/contact.ejs"));

app.get("/services", (req, res) => {
	checkIfLogined(res, "main-pages/services.ejs");
});

app.get("/team", (req, res) => res.render("main-pages/team.ejs"));
app.get("/reference", (req, res) => res.render("main-pages/reference.ejs"));
app.get("/logout", (req, res) => {
	connection.query("SELECT ID FROM sessionn", (error, results) => {
		if (!error){
			let sessionnID = results[0];
			connection.query(`SELECT * FROM auditTrail WHERE userID = ${sessionnID.ID}`, (error, results) => {
				if (!error){
					connection.query(`UPDATE auditTrail SET logout = NOW() WHERE userID = ${sessionnID.ID} AND ID = ${results[results.length - 1].ID}`, (error, results) => {
						if (!error){
							console.log("Success")
						}
					})
				}
			})
		}
	})

	let updateSession = "UPDATE sessionn SET ID = 0";
	connection.query(updateSession, (error, results) => {
		if (error) {
			console.error("Error updating session:", error.message);
		} else {
			console.log(
				"session updated successfully:",
				results.affectedRows,
				"rows affected"
			);
		}
	});
	res.redirect("http://localhost/");
});

//**authentication */
app.get("/login", (req, res) => res.redirect("http://localhost/"));

app.get("/register", (req, res) =>
	res.redirect("http://localhost/register.php")
);
app.get("/forgot-password-get-code", (req, res) =>
	res.render("authentication/forgotPasswordGetCode.ejs")
);
app.get("/forgot-password-last-step", (req, res) =>
	res.render("authentication/forgotPasswordLastStep.ejs")
);
app.get("/admin-login", (req, res) =>
	res.redirect("http://localhost/adminLogin.php") // localhost:8000/adminLogin.php if hindi nag wwork sayo
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

		res.render("admin/adminUsers.ejs", { adminUsers: results });
	});
});

app.get("/admin-audit-trail", (req, res) => {
	const sql = "SELECT * FROM auditTrail"; // Adjust the query based on your table name
	connection.query(sql, (error, results, fields) => {
		if (error) {
			console.error("Error retrieving admin history:", error);
			res.status(500).send("Error retrieving admin history");
			throw error;
		}

		res.render("admin/adminAuditTrail.ejs", { adminUsers: results });
	});
});

// user
let ID;
app.put("/user-update:ID", async (req, res) => {
	connection.query("SELECT ID FROM sessionn", (error, results, fields) => {
		if (error) {
			console.error("Error fetching data:", error.message);
		} else {
			console.log("Fetched data:", results);
		}

		ID = results[0].ID;

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
});

// password update
app.put("/user/pass/update:ID", async (req, res) => {
	connection.query("SELECT ID FROM sessionn", (error, results, fields) => {
		if (error) {
			console.error("Error fetching data:", error.message);
		} else {
			console.log("Fetched data:", results);
		}

		ID = results[0].ID;

		const confirmPassInput = req.body;
		console.log(ID, confirmPassInput);
		for (const [key, value] of Object.entries(confirmPassInput)) {
			const parsedData = JSON.parse(key);

			const { confirmPassInput } = parsedData;
			const sql = "UPDATE user SET passwordd=? WHERE ID = ?";
			connection.query(
				sql,
				[confirmPassInput, ID],
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
});

//**ALL FEATURES START */
//**quick-information */
app.get("/todo-list", (req, res) =>
	checkIfLogined(res, "quick-information/todoList.ejs")
);

app.get("/weather", (req, res) =>
	checkIfLogined(res, "quick-information/weather.ejs")
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

app.get("/pdf-to-word", (req, res) =>
	checkIfLogined(res, "document-converter/pdfToWord.ejs")
);

//**unit-converter */
app.get("/converter", (req, res) =>
	checkIfLogined(res, "unit-converter/converter.ejs")
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

			res.write("<p>The weather is currently " + weatherDescription + "</p>");
			res.write(
				"<h1>The temperature in " +
					query +
					" is " +
					temp +
					" degree celsius.</h1>"
			);
			res.write("<img src=" + imgURL + ">");
			res.send();
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
