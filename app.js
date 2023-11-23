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
app.get("/", (req, res) => res.render("index.ejs"));
app.get("/about", (req, res) => res.render("about.ejs"));
app.get("/contact", (req, res) => res.render("contact.ejs"));
app.get("/service", (req, res) => res.render("service.ejs"));
app.get("/team", (req, res) => res.render("team.ejs"));
app.get("/profile", (req, res) => res.render("profile.ejs"));
app.get("/reference", (req, res) => res.render("reference.ejs"));

//**Login - Register */
app.get("/login", (req, res) => res.render("login.ejs"));
app.get("/register", (req, res) => res.render("register.ejs"));
app.get("/forgotPassGetCode", (req, res) =>
	res.render("forgotPassGetCode.ejs")
);
app.get("/forgotPasswordGetCode", (req, res) =>
	res.render("forgotPasswordGetCode.ejs")
);
app.get("/forgotPasswordLastStep", (req, res) =>
	res.render("forgotPasswordLastStep.ejs")
);

//**Profile */
app.get("/history", (req, res) => res.render("profileHistory.ejs"));
app.get("/notification", (req, res) => res.render("profileNotification.ejs"));
app.get("/security", (req, res) => res.render("profileSecurity.ejs"));

//**Admin */
app.get("/admin", (req, res) => res.render("admin.ejs"));
app.get("/admin-history", (req, res) => res.render("adminHistory.ejs"));
app.get("/admin-notification", (req, res) =>
	res.render("adminNotification.ejs")
);
app.get("/admin-security", (req, res) => res.render("adminSecurity.ejs"));

//**Features */
app.get("/todo", (req, res) => res.render("todo.ejs"));
app.get("/weather", (req, res) => res.render("weather.ejs"));
app.get("/chatAI", (req, res) => res.render("chatAI.ejs"));
app.get("/calculator", (req, res) => res.render("calculator.ejs"));
app.get("/wordToPdf", (req, res) => res.render("wordToPdf.ejs"));
app.get("/pdfToWord", (req, res) => res.render("pdfToWord.ejs"));
app.get("/converter", (req, res) => res.render("converter.ejs"));

//**Resumes */
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
