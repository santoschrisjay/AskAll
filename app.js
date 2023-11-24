//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import session from "express-session";
import https from "https";
import connected from "process";
import get from "http";

const app = express();

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

//**ALL PAGES START */
//**Pages */
app.get("/", (req, res) => res.render("main-pages/index.ejs"));
app.get("/about", (req, res) => res.render("main-pages/about.ejs"));
app.get("/contact", (req, res) => res.render("main-pages/contact.ejs"));
app.get("/services", (req, res) => res.render("main-pages/services.ejs"));
app.get("/team", (req, res) => res.render("main-pages/team.ejs"));
app.get("/reference", (req, res) => res.render("main-pages/reference.ejs"));

//**authentication */
app.get("/login", (req, res) => res.render("authentication/login.ejs"));
app.get("/register", (req, res) => res.render("authentication/register.ejs"));
app.get("/forgot-password-get-code", (req, res) =>
	res.render("authentication/forgotPasswordGetCode.ejs")
);
app.get("/forgot-password-last-step", (req, res) =>
	res.render("authentication/forgotPasswordLastStep.ejs")
);

//**profile */
app.get("/profile", (req, res) => res.render("profile/profile.ejs"));
app.get("/profile-history", (req, res) =>
	res.render("profile/profileHistory.ejs")
);
app.get("/profile-notification", (req, res) =>
	res.render("profile/profileNotification.ejs")
);
app.get("/profile-security", (req, res) =>
	res.render("profile/profileSecurity.ejs")
);

//**admin */
app.get("/admin", (req, res) => res.render("admin/admin.ejs"));
app.get("/admin-history", (req, res) => res.render("admin/adminHistory.ejs"));
app.get("/admin-notification", (req, res) =>
	res.render("admin/adminNotification.ejs")
);
app.get("/admin-security", (req, res) => res.render("admin/adminSecurity.ejs"));

//**ALL FEATURES START */
//**quick-information */
app.get("/todo-list", (req, res) =>
	res.render("quick-information/todoList.ejs")
);
app.get("/weather", (req, res) => res.render("quick-information/weather.ejs"));
app.get("/calculator", (req, res) =>
	res.render("quick-information/calculator.ejs")
);

//**chat-AI */
app.get("/chatAI", (req, res) => res.render("chat-AI/chatAI.ejs"));

//**document-converter */
app.get("/word-to-pdf", (req, res) =>
	res.render("document-converter/wordToPdf.ejs")
);
app.get("/pdf-to-word", (req, res) =>
	res.render("document-converter/pdfToWord.ejs")
);

//**unit-converter */
app.get("/converter", (req, res) => res.render("unit-converter/converter.ejs"));

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
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
