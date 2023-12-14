//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import session from "express-session"; //naka include na ito yon for express session
import https from "https";
import fs from "fs";
import CloudmersiveConvertApiClient from "cloudmersive-convert-api-client";
import fileUpload from "express-fileupload";
import _ from "lodash";
import expressMyConnection from "express-myconnection";
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
import { log } from "console";

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
	password: "weakka12",
	port: 3306, // palitan mo sa port ng workbench mo if nakarecieve ka ng error about CONNECT ECONNREFUSED
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
			res.redirect("http://localhost:8080"); // localhost:8080:8000 if hindi nag wwork sayo
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
	let dateCreated = req.body.dateCreated;

	if (button == "update") {
		let queryFirstName = `firstName = '${firstName}'`;
		let queryLastName = `lastName = '${lastName}'`;
		let queryEmail = `email = '${email}'`;
		let queryPhoneNumber = `phoneNumber = '${phoneNumber}'`;

		if (queryEmail != "") {
			connection.query(
				`SELECT * FROM user WHERE email = "${email}"`,
				(error, results) => {
					if (!results[0] || (results[0] && results[0].ID == userID)) {
						connection.query(
							`UPDATE user SET ${queryFirstName}, ${queryLastName}, ${queryEmail}, ${queryPhoneNumber} WHERE ID = ${userID}`,
							(error, results) => {
								if (!error) {
									console.log("success");
								}
								res.redirect("/admin-users");
							}
						);
					} else {
						//kapag exists
						connection.query(
							`UPDATE user SET notif = "The email already exists"`
						);
						res.redirect("/admin-users");
					}
				}
			);
		} else {
			res.redirect("/admin-users");
		}
	} else {
		let values = `VALUES (${userID}, '${firstName}', '${lastName}', '${email}', '${phoneNumber}', '${dateCreated}')`;
		connection.query(
			`INSERT INTO archive (ID, firstName, lastName, email, phoneNumber, accountDateCreated) ${values}`,
			(error, results) => {
				if (!error) {
					connection.query(
						`UPDATE user SET inArchive = 'true' WHERE ID = ${userID}`
					);
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

//LOGOUTS
app.get("/admin-logout", (req, res) => {
	res.redirect("http://localhost:3000/admin-login");
	connection.query("UPDATE admin_session SET ID = 0");
});

app.get("/logout", (req, res) => {
	connection.query("SELECT ID FROM sessionn", (error, results) => {
		if (!error) {
			let sessionnID = results[0];
			connection.query(
				`SELECT * FROM auditTrail WHERE userID = ${sessionnID.ID}`,
				(error, results) => {
					if (!error) {
						connection.query(
							`UPDATE auditTrail SET logout = NOW() WHERE userID = ${
								sessionnID.ID
							} AND ID = ${results[results.length - 1].ID}`,
							(error, results) => {
								if (!error) {
									console.log("Success");
								}
							}
						);
					}
				}
			);
		}
	});

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
	res.redirect("http://localhost:8080/"); // lagyan mo ng :8080 if hindi nag wwork
});

//**authentication */
app.get("/login", (req, res) => res.redirect("http://localhost:8080/")); // lagyan mo ng :8080 if hindi nag wwork

app.get(
	"/register",
	(req, res) => res.redirect("http://localhost:8080/register.php") //lagyan mo ng :8080 if hindi nag wwork
);
app.get("/forgot-password-get-code", (req, res) =>
	res.render("authentication/forgotPasswordGetCode.ejs")
);
app.get("/forgot-password-last-step", (req, res) =>
	res.render("authentication/forgotPasswordLastStep.ejs")
);
app.get(
	"/admin-login",
	(req, res) => res.redirect("http://localhost:8080/adminLogin.php") // localhost:8080:8000/adminLogin.php if hindi nag wwork sayo
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
					const { firstName, lastName, email, phoneNumber, passwordd, notif } =
						results[0];
					// const formattedFirstName = capitalizeWords(first_name);
					// const formattedLastName = capitalizeWords(last_name);
					res.render("profile/profile", {
						firstName,
						lastName,
						email,
						phoneNumber,
						passwordd,
						notif,
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

//**admin */
// app.get("/admin", (req, res) => res.render("admin/admin.ejs"));
app.get("/admin", (req, res) => {
	// const userId = req.session.userId; bali dapat parang ganto
	let logined;
	connection.query("SELECT ID FROM admin_session", (error, results) => {
		logined = results[0].ID;

		if (logined != 0) {
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
						const { first_name, last_name, email_address, phone_number } =
							results[0];
						res.render("admin/admin", {
							first_name,
							last_name,
							email_address,
							phone_number,
						});
					} else {
						res.status(404).send("User not found");
					}
				});
			} else {
				res.status(401).send("Unauthorized");
			}
		} else {
			res.redirect("http://localhost:8080/adminLogin.php");
		}
	});
});

app.post("/admin-users", (req, res) => {
	const input = req.body;
	const resultData = [];
	for (const [key, value] of Object.entries(input)) {
		const parsedData = JSON.parse(key);

		const { input } = parsedData;

		const sql =
			"SELECT * FROM user WHERE (inArchive = 'false' AND firstName LIKE ?) OR (inArchive = 'false' AND lastName LIKE ?) OR (inArchive = 'false' AND email LIKE ?) OR (inArchive = 'false' AND phoneNumber LIKE ?) OR (inArchive = 'false' AND accountDateCreated LIKE ?)";
		const searchInput = `%${input}%`;
		console.log(searchInput);

		connection.query(
			sql,
			[searchInput, searchInput, searchInput, searchInput, searchInput],
			(error, results, fields) => {
				if (error) {
					console.error("Error retrieving admin history:", error);
					res.status(500).send("Error retrieving admin history");
					throw error;
				}
				console.log(results);
				res.status(200).json(results);
			}
		);
	}
});

app.get("/admin-users", (req, res) => {
	const sql = "SELECT * FROM user WHERE inArchive != 'true' ";
	connection.query(sql, (error, results, fields) => {
		if (error) {
			console.error("Error retrieving admin users:", error);
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
//ARCHIVE
app.get("/admin-archived-users", (req, res) => {
	
	const sql = "SELECT * FROM archive";
	connection.query(sql, (error, results, fields) => {
		if (error) {
			console.error("Error retrieving admin users:", error);
			res.status(500).send("Error retrieving admin history");
			throw error;
		}
		res.render("admin/adminArchivedUsers.ejs", { adminUsers: results });
	});
});

app.post("/admin-archived-search", (req, res) => {
	const input = req.body;
	const resultData = [];
	for (const [key, value] of Object.entries(input)) {
		const parsedData = JSON.parse(key);

		const { input } = parsedData;

		const sql =
		"SELECT * FROM user WHERE (inArchive = 'true' AND firstName LIKE ?) OR (inArchive = 'true' AND lastName LIKE ?) OR (inArchive = 'true' AND email LIKE ?) OR (inArchive = 'true' AND phoneNumber LIKE ?) OR (inArchive = 'true' AND accountDateCreated LIKE ?)";
		const searchInput = `%${input}%`;
		console.log(searchInput);

		connection.query(
			sql,
			[searchInput, searchInput, searchInput, searchInput, searchInput],
			(error, results, fields) => {
				if (error) {
					console.error("Error retrieving admin history:", error);
					res.status(500).send("Error retrieving admin history");
					throw error;
				}
				console.log(results);
				res.status(200).json(results);
			}
		);
	}
});


app.post("/admin-archived-users", (req, res) => {
	let userID = req.body.userID;
	let button = req.body.button;

	if (button == "restore") {
		connection.query(
			`UPDATE user SET inArchive = 'false' WHERE ID = ${userID}`
		);
		connection.query(`DELETE FROM archive WHERE ID = ${userID}`);
	} else if (button == "delete") {
		connection.query(`DELETE FROM archive WHERE ID = ${userID}`);
		connection.query(`DELETE FROM user WHERE ID = ${userID}`);
	}
	res.redirect("http://localhost:3000/admin-archived-users");
});

// user
let ID;
app.post("/delete-account", (req, res) => {
	connection.query("SELECT * FROM sessionn", (error, results) => {
		connection.query(
			`SELECT * FROM user WHERE ID = ${results[0].ID}`,
			(error, results) => {
				connection.query(
					`UPDATE user SET inArchive = 'true' WHERE ID = ${results[0].ID}`
				);
				let values = `VALUES (${results[0].ID}, '${results[0].firstName}', '${results[0].lastName}', '${results[0].email}', '${results[0].phoneNumber}', '${results[0].accountDateCreated}')`;
				connection.query(
					`INSERT INTO archive (ID, firstName, lastName, email, phoneNumber, accountDateCreated) ${values}`,
					(error, results) => {
						if (!error) {
							connection.query("UPDATE sessionn SET ID = 0");
						}
					}
				);
			}
		);
	});
	res.redirect("http://localhost:8080/");
});

app.put("/user-update:ID", async (req, res) => {
	connection.query("SELECT * FROM sessionn", (error, results, fields) => {
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

			let currentEmail;
			connection.query(
				`SELECT email FROM user WHERE ID = ${ID}`,
				(error, results) => {
					currentEmail = results[0].email;
				}
			);
			console.log(currentEmail);
			connection.query(
				`SELECT * FROM user WHERE email = "${email_address}"`,
				(error, results) => {
					if (!results[0] || (results[0] && currentEmail == email_address)) {
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
										res
											.status(404)
											.send("User not found or no changes were made");
									}
								}
							}
						);
					} else {
						connection.query(
							`UPDATE user SET notif = "The email already exists"`
						);
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
// app.get("/todo-list", (req, res) =>
// 	checkIfLogined(res, "quick-information/todoList.ejs")
// );

const defaultItems = [
	{ name: "Welcome to your todolist!" },
	{ name: "Hit the + button to add new item." },
	{ name: "<-- Hit this to delete an item." },
];

app.get("/todo-list", (req, res) => {
	let user_ID;

	connection.query("SELECT ID FROM sessionn", (error, results, fields) => {
		if (error) {
			console.error("Error fetching data:", error.message);
			res.status(500).send("Error fetching data");
		} else {
			console.log("Fetched data:", results);

			// Assuming there's only one result
			user_ID = results.length > 0 ? results[0].ID : null;

			if (user_ID) {
				const sql = "SELECT * FROM todo_list WHERE user_ID = ?";

				connection.query(sql, [user_ID], (err, rows) => {
					if (err) {
						console.error("Error retrieving user data:", err);
						res.status(500).send("Error retrieving user data");
					} else {
						if (rows.length === 0) {
							connection.query(
								"INSERT INTO todo_list (user_ID, items) VALUES ?",
								[defaultItems.map((item) => [user_ID, item.name])],
								(insertErr) => {
									if (insertErr) {
										console.error("Error adding data:", insertErr);
										res.status(500).send("Error adding data");
									} else {
										console.log("Data successfully added!");
										res.redirect("/todo-list");
									}
								}
							);
						} else {
							res.render("quick-information/todoList", {
								listTitle: "Today",
								newListItems: rows,
							});
						}
					}
				});
			} else {
				res.status(401).send("Unauthorized");
			}
		}
	});
});

app.post("/todo-list-add", async (req, res) => {
	const newItem = req.body.newItem;
	const listName = req.body.listName; // Assuming you have a form field named 'list'

	console.log(newItem);
	console.log("List Name:", listName);

	let user_ID;

	connection.query("SELECT ID FROM sessionn", (error, results, fields) => {
		if (error) {
			console.error("Error fetching data:", error.message);
			res.status(500).send("Internal Server Error");
		} else {
			console.log("Fetched data:", results);

			user_ID = results[0].ID;

			if (user_ID) {
				const sql = "INSERT INTO todo_list (user_ID, items) VALUES (?, ?)";

				connection.query(sql, [user_ID, newItem], (err, result) => {
					if (err) {
						console.error("Error adding item:", err);
						res.status(500).send("Internal Server Error");
					} else {
						console.log("Item added successfully!");
						res.redirect("/todo-list"); // Redirect back to the to-do list
					}
				});
			} else {
				res.status(401).send("Unauthorized");
			}
		}
	});
});

app.post("/todo-list-delete", (req, res) => {
	const checkedItemID = req.body.checkbox;
	const listName = req.body.listName;

	console.log("Checked Item ID:", checkedItemID);
	console.log("List Name:", listName);

	// Assuming you have a database connection named 'connection'
	const sql = "DELETE FROM todo_list WHERE todo_ID = ?";

	connection.query(sql, [checkedItemID], (err, result) => {
		if (err) {
			console.error("Error deleting item:", err);
			res.status(500).send("Internal Server Error");
		} else {
			console.log("Item deleted successfully!");
			res.redirect("todo-list"); // Redirect back to the to-do list
		}
	});
});

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
const documentApiKey = process.env.DOCUMENT_API_KEY;

app.get("/word-to-pdf", (req, res) =>
	checkIfLogined(res, "document-converter/wordToPdf.ejs")
);

app.post("/convertWordToPdf", (req, res) => {
	var defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;

	// Configure API key authorization: Apikey
	var Apikey = defaultClient.authentications["Apikey"];
	Apikey.apiKey = documentApiKey;

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
	Apikey.apiKey = documentApiKey;

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
const weatherApiKey = process.env.WEATHER_API_KEY;

app.post("/weather", function (req, res) {
	const query = req.body.cityName;
	const unit = "metric";
	const url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		query +
		"&appid=" +
		weatherApiKey +
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
