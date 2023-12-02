(function ($) {
	"use strict";

	$(document).ready(function () {
		$(".table-row").click(function () {
			const adminId = $(this).data("admin-id");
			const firstName = $(this).find("td:nth-child(2)").text();
			const lastName = $(this).find("td:nth-child(3)").text();
			const emailAddress = $(this).find("td:nth-child(4)").text();
			const phoneNumber = $(this).find("td:nth-child(5)").text();

			$("#adminId").val(adminId);
			$("#firstName").val(firstName);
			$("#lastName").val(lastName);
			$("#emailAddress").val(emailAddress);
			$("#phoneNumber").val(phoneNumber);
		});
	});

	// Spinner
	var spinner = function () {
		setTimeout(function () {
			if ($("#spinner").length > 0) {
				$("#spinner").removeClass("show");
			}
		}, 1);
	};
	spinner();

	// Initiate the wowjs
	new WOW().init();

	// Sticky Navbar
	$(window).scroll(function () {
		if ($(this).scrollTop() > 45) {
			$(".navbar").addClass("sticky-top shadow-sm");
		} else {
			$(".navbar").removeClass("sticky-top shadow-sm");
		}
	});

	// Dropdown on mouse hover
	const $dropdown = $(".dropdown");
	const $dropdownToggle = $(".dropdown-toggle");
	const $dropdownMenu = $(".dropdown-menu");
	const showClass = "show";

	$(window).on("load resize", function () {
		if (this.matchMedia("(min-width: 992px)").matches) {
			$dropdown.hover(
				function () {
					const $this = $(this);
					$this.addClass(showClass);
					$this.find($dropdownToggle).attr("aria-expanded", "true");
					$this.find($dropdownMenu).addClass(showClass);
				},
				function () {
					const $this = $(this);
					$this.removeClass(showClass);
					$this.find($dropdownToggle).attr("aria-expanded", "false");
					$this.find($dropdownMenu).removeClass(showClass);
				}
			);
		} else {
			$dropdown.off("mouseenter mouseleave");
		}
	});

	// Facts counter
	$('[data-toggle="counter-up"]').counterUp({
		delay: 10,
		time: 2000,
	});

	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$(".back-to-top").fadeIn("slow");
		} else {
			$(".back-to-top").fadeOut("slow");
		}
	});
	$(".back-to-top").click(function () {
		$("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
		return false;
	});

	// Testimonials carousel
	$(".testimonial-carousel").owlCarousel({
		autoplay: true,
		smartSpeed: 1500,
		dots: true,
		loop: true,
		center: true,
		responsive: {
			0: {
				items: 1,
			},
			576: {
				items: 1,
			},
			768: {
				items: 2,
			},
			992: {
				items: 3,
			},
		},
	});

	// Vendor carousel
	$(".vendor-carousel").owlCarousel({
		loop: true,
		margin: 45,
		dots: false,
		loop: true,
		autoplay: true,
		smartSpeed: 1000,
		responsive: {
			0: {
				items: 2,
			},
			576: {
				items: 4,
			},
			768: {
				items: 6,
			},
			992: {
				items: 8,
			},
		},
	});
})(jQuery);

//** WEIGHT CONVERTER */ 
function convertWeight() {
    // Get input values
    const inputWeight = parseFloat(document.getElementById('inputWeight').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    // Perform conversion
    let result;
    switch (fromUnit) {
        case 'kilogram':
            result = convertFromKilogram(inputWeight, toUnit);
            break;
        case 'gram':
            result = convertFromGram(inputWeight, toUnit);
            break;
        case 'milligram':
            result = convertFromMilligram(inputWeight, toUnit);
            break;
        case 'metricTon':
            result = convertFromMetricTon(inputWeight, toUnit);
            break;
        case 'longTon':
            result = convertFromLongTon(inputWeight, toUnit);
            break;
        case 'shortTon':
            result = convertFromShortTon(inputWeight, toUnit);
            break;
        case 'pound':
            result = convertFromPound(inputWeight, toUnit);
            break;
        case 'ounce':
            result = convertFromOunce(inputWeight, toUnit);
            break;
        case 'carrat':
            result = convertFromcarrat(inputWeight, toUnit);
            break;
        case 'amu':
            result = convertFromAMU(inputWeight, toUnit);
            break;
        default:
            result = 'Invalid from unit';
    }

    // Display result
    document.getElementById('weightResult').innerHTML = inputWeight + ' ' + fromUnit + ' is ' + result + ' ' + toUnit;
}

function convertFromKilogram(weight, toUnit) {
    switch (toUnit) {
        case 'kilogram':
            return weight;
        case 'gram':
            return weight * 1000;
        case 'milligram':
            return weight * 1e+6;
        case 'metricTon':
            return weight * 0.001;
        case 'longTon':
            return weight * 0.000984207;
        case 'shortTon':
            return weight * 0.00110231;
        case 'pound':
            return weight * 2.20462;
        case 'ounce':
            return weight * 35.274;
        case 'carrat':
            return weight * 5000;
        case 'amu':
            // Assuming 1 AMU is approximately 1.660539040e-27 kilograms
            return weight / 1.660539040e-27;
        default:
            return 'Invalid to unit';
    }
}

function convertFromGram(weight, toUnit) {
    switch (toUnit) {
        case 'kilogram':
            return weight * 0.001;
        case 'gram':
            return weight;
        case 'milligram':
            return weight * 1000;
        case 'metricTon':
            return weight * 1e-6;
        case 'longTon':
            return weight * 9.8421e-7;
        case 'shortTon':
            return weight * 1.1023e-6;
        case 'pound':
            return weight * 0.00220462;
        case 'ounce':
            return weight * 0.035274;
        case 'carrat':
            return weight * 5;
        case 'amu':
            // Assuming 1 AMU is approximately 1.660539040e-24 grams
            return weight / 1.660539040e-24;
        default:
            return 'Invalid to unit';
    }
}

function convertFromMilligram(weight, toUnit) {
    switch (toUnit) {
        case 'kilogram':
            return weight * 1e-6;
        case 'gram':
            return weight * 0.001;
        case 'milligram':
            return weight;
        case 'metricTon':
            return weight * 1e-9;
        case 'longTon':
            return weight * 9.8421e-10;
        case 'shortTon':
            return weight * 1.1023e-9;
        case 'pound':
            return weight * 2.2046e-6;
        case 'ounce':
            return weight * 3.5274e-5;
        case 'carrat':
            return weight * 0.005;
        case 'amu':
            // Assuming 1 AMU is approximately 1.660539040e-27 grams
            return weight / 1.660539040e-27;
        default:
            return 'Invalid to unit';
    }
}

function convertFromMetricTon(weight, toUnit) {
    switch (toUnit) {
        case 'kilogram':
            return weight * 1000;
        case 'gram':
            return weight * 1e+6;
        case 'milligram':
            return weight * 1e+9;
        case 'metricTon':
            return weight;
        case 'longTon':
            return weight * 0.984207;
        case 'shortTon':
            return weight * 1.10231;
        case 'pound':
            return weight * 2204.62;
        case 'ounce':
            return weight * 35274;
        case 'carrat':
            return weight * 5000000;
        case 'amu':
            // Assuming 1 AMU is approximately 1.660539040e-24 grams
            return weight * 6.02214e+29;
        default:
            return 'Invalid to unit';
    }
}


function convertFromLongTon(weight, toUnit) {
    switch (toUnit) {
        case 'kilogram':
            return weight * 1016.05;
        case 'gram':
            return weight * 1.01605e+6;
        case 'milligram':
            return weight * 1.01605e+9;
        case 'metricTon':
            return weight * 1.01605;
        case 'longTon':
            return weight;
        case 'shortTon':
            return weight * 1.12;
        case 'pound':
            return weight * 2240;
        case 'ounce':
            return weight * 35840;
        case 'carrat':
            return weight * 508023;
        case 'amu':
            // Assuming 1 AMU is approximately 1.660539040e-24 grams
            return weight * 6.02214e+32;
        default:
            return 'Invalid to unit';
    }
}

function convertFromShortTon(weight, toUnit) {
    switch (toUnit) {
        case 'kilogram':
            return weight * 907.185;
        case 'gram':
            return weight * 907185;
        case 'milligram':
            return weight * 907185000;
        case 'metricTon':
            return weight * 0.907185;
        case 'longTon':
            return weight * 0.892857;
        case 'shortTon':
            return weight;
        case 'pound':
            return weight * 2000;
        case 'ounce':
            return weight * 32000;
        case 'carrat':
            return weight * 4535920;
        case 'amu':
            // Assuming 1 AMU is approximately 1.660539040e-24 grams
            return weight * 6.02214e+29;
        default:
            return 'Invalid to unit';
    }
}

function convertFromPound(weight, toUnit) {
    switch (toUnit) {
        case 'kilogram':
            return weight * 0.453592;
        case 'gram':
            return weight * 453.592;
        case 'milligram':
            return weight * 453592;
        case 'metricTon':
            return weight * 0.000453592;
        case 'longTon':
            return weight * 0.000446429;
        case 'shortTon':
            return weight * 0.0005;
        case 'pound':
            return weight;
        case 'ounce':
            return weight * 16;
        case 'carrat':
            return weight * 2267.96;
        case 'amu':
            // Assuming 1 AMU is approximately 1.660539040e-24 grams
            return weight * 6.02214e+26;
        default:
            return 'Invalid to unit';
    }
}

function convertFromOunce(weight, toUnit) {
    switch (toUnit) {
        case 'kilogram':
            return weight * 0.0283495;
        case 'gram':
            return weight * 28.3495;
        case 'milligram':
            return weight * 28349.5;
        case 'metricTon':
            return weight * 2.83495e-5;
        case 'longTon':
            return weight * 2.79018e-5;
        case 'shortTon':
            return weight * 3.125e-5;
        case 'pound':
            return weight * 0.0625;
        case 'ounce':
            return weight;
        case 'carrat':
            return weight * 141.748;
        case 'amu':
            // Assuming 1 AMU is approximately 1.660539040e-24 grams
            return weight * 6.02214e+25;
        default:
            return 'Invalid to unit';
    }
}

function convertFromcarrat(weight, toUnit) {
    switch (toUnit) {
        case 'kilogram':
            return weight * 0.0002;
        case 'gram':
            return weight * 0.2;
        case 'milligram':
            return weight * 200;
        case 'metricTon':
            return weight * 2e-7;
        case 'longTon':
            return weight * 1.96841e-7;
        case 'shortTon':
            return weight * 2.20462e-7;
        case 'pound':
            return weight * 0.000440925;
        case 'ounce':
            return weight * 0.007055;
        case 'carrat':
            return weight;
        case 'amu':
            // Assuming 1 AMU is approximately 1.660539040e-24 grams
            return weight * 6.02214e+22;
        default:
            return 'Invalid to unit';
    }
}

function convertFromAMU(weight, toUnit) {
    switch (toUnit) {
        case 'kilogram':
            // Assuming 1 AMU is approximately 1.660539040e-27 kilograms
            return weight * 1.660539040e-27;
        case 'gram':
            // Assuming 1 AMU is approximately 1.660539040e-27 grams
            return weight;
        case 'milligram':
            // Assuming 1 AMU is approximately 1.660539040e-27 grams
            return weight * 1e+3;
        case 'metricTon':
            // Assuming 1 AMU is approximately 1.660539040e-27 grams
            return weight * 1.660539040e-30;
        case 'longTon':
            // Assuming 1 AMU is approximately 1.660539040e-27 grams
            return weight * 1.62941e-30;
        case 'shortTon':
            // Assuming 1 AMU is approximately 1.660539040e-27 grams
            return weight * 1.81818e-30;
        case 'pound':
            // Assuming 1 AMU is approximately 1.660539040e-27 grams
            return weight * 3.66086e-30;
        case 'ounce':
            // Assuming 1 AMU is approximately 1.660539040e-27 grams
            return weight * 5.85737e-29;
        case 'carrat':
            // Assuming 1 AMU is approximately 1.660539040e-27 grams
            return weight * 1.66054e+22;
        case 'amu':
            return weight;
        default:
            return 'Invalid to unit';
    }
}

//** VOLUME CONVERTER */
function convertVolume() {
    // Get input values
    const inputVolume = parseFloat(document.getElementById('inputVolume').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    // Perform conversion
    var result;
    switch (fromUnit) {
        case 'cubicMeter':
            result = convertFromCubicMeter(inputVolume, toUnit);
            break;
        case 'cubicKilometer':
            result = convertFromCubicKilometer(inputVolume, toUnit);
            break;
        case 'cubicCentimeter':
            result = convertFromCubicCentimeter(inputVolume, toUnit);
            break;
        case 'cubicMillimeter':
            result = convertFromCubicMillimeter(inputVolume, toUnit);
            break;
        case 'liter':
            result = convertFromLiter(inputVolume, toUnit);
            break;
        case 'milliliter':
            result = convertFromMilliliter(inputVolume, toUnit);
            break;
        case 'usGallon':
            result = convertFromUSGallon(inputVolume, toUnit);
            break;
        case 'usQuart':
            result = convertFromUSQuart(inputVolume, toUnit);
            break;
        case 'usPint':
            result = convertFromUSPint(inputVolume, toUnit);
            break;
        case 'usCup':
            result = convertFromUSCup(inputVolume, toUnit);
            break;
        case 'usFluidOunce':
            result = convertFromUSFluidOunce(inputVolume, toUnit);
            break;
        case 'usTableSpoon':
            result = convertFromUSTableSpoon(inputVolume, toUnit);
            break;
        case 'imperialGallon':
            result = convertFromImperialGallon(inputVolume, toUnit);
            break;
        case 'imperialQuart':
            result = convertFromImperialQuart(inputVolume, toUnit);
            break;
        case 'imperialPint':
            result = convertFromImperialPint(inputVolume, toUnit);
            break;
        case 'imperialFluidOunce':
            result = convertFromImperialFluidOunce(inputVolume, toUnit);
            break;
        case 'imperialTableSpoon':
            result = convertFromImperialTableSpoon(inputVolume, toUnit);
            break;
        case 'imperialTeaSpoon':
            result = convertFromImperialTeaSpoon(inputVolume, toUnit);
            break;
        case 'cubicMile':
            result = convertFromCubicMile(inputVolume, toUnit);
            break;
        case 'cubicYard':
            result = convertFromCubicYard(inputVolume, toUnit);
            break;
        case 'cubicFoot':
            result = convertFromCubicFoot(inputVolume, toUnit);
            break;
        case 'cubicInch':
            result = convertFromCubicInch(inputVolume, toUnit);
            break;
        default:
            result = 'Invalid from unit';
    }

    // Display the result
    document.getElementById('result').innerHTML = inputVolume + ' ' + fromUnit + ' is ' + result + ' ' + toUnit;
}

function convertFromCubicMeter(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume;
        case 'cubicKilometer':
            return volume * 1e-12;
        case 'cubicCentimeter':
            return volume * 1e6;
        case 'cubicMillimeter':
            return volume * 1e9;
        case 'liter':
            return volume * 1000;
        case 'millimeter':
            return volume * 1e6;
        case 'usGallon':
            return volume * 264.172;
        case 'usQuart':
            return volume * 1056.688;
        case 'usPint':
            return volume * 2113.376;
        case 'usCup':
            return volume * 4226.752;
        case 'usFluidOunce':
            return volume * 33814.022;
        case 'usTableSpoon':
            return volume * 67628.05;
        case 'imperialGallon':
            return volume * 219.969;
        case 'imperialQuart':
            return volume * 879.877;
        case 'imperialPint':
            return volume * 1759.753;
        case 'imperialFluidOunce':
            return volume * 35195.07;
        case 'imperialTableSpoon':
            return volume * 56312.11;
        case 'imperialTeaSpoon':
            return volume * 168936.3;
        case 'cubicMile':
            return volume * 2.3991e-16;
        case 'cubicYard':
            return volume * 1.30795062;
        case 'cubicFoot':
            return volume * 35.3147;
        case 'cubicInch':
            return volume * 61023.74;
        default:
            return 'Invalid to unit';
    }
}

function convertFromCubicKilometer(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 1e12;
        case 'cubicKilometer':
            return volume;
        case 'cubicCentimeter':
            return volume * 1e15;
        case 'cubicMillimeter':
            return volume * 1e18;
        case 'liter':
            return volume * 1e12;
        case 'millimeter':
            return volume * 1e15;
        case 'usGallon':
            return volume * 2.64172e11;
        case 'usQuart':
            return volume * 1.056688e12;
        case 'usPint':
            return volume * 2.113376e12;
        case 'usCup':
            return volume * 4.226752e12;
        case 'usFluidOunce':
            return volume * 3.381402e13;
        case 'usTableSpoon':
            return volume * 6.762805e13;
        case 'imperialGallon':
            return volume * 2.199692e11;
        case 'imperialQuart':
            return volume * 8.798767e11;
        case 'imperialPint':
            return volume * 1.759753e12;
        case 'imperialFluidOunce':
            return volume * 3.519507e13;
        case 'imperialTableSpoon':
            return volume * 5.631211e13;
        case 'imperialTeaSpoon':
            return volume * 1.689363e14;
        case 'cubicMile':
            return volume / 4.168e9;
        case 'cubicYard':
            return volume * 1.30795062e12;
        case 'cubicFoot':
            return volume * 3.531472e13;
        case 'cubicInch':
            return volume * 6.102374e15;
        default:
            return 'Invalid to unit';
    }
}

function convertFromCubicCentimeter(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 1e-6;
        case 'cubicKilometer':
            return volume * 1e-15;
        case 'cubicCentimeter':
            return volume;
        case 'cubicMillimeter':
            return volume * 1000;
        case 'liter':
            return volume * 0.001;
        case 'millimeter':
            return volume;
        case 'usGallon':
            return volume * 0.000264172;
        case 'usQuart':
            return volume * 0.001056688;
        case 'usPint':
            return volume * 0.002113376;
        case 'usCup':
            return volume * 0.004226752;
        case 'usFluidOunce':
            return volume * 0.033814022;
        case 'usTableSpoon':
            return volume * 0.06762805;
        case 'imperialGallon':
            return volume * 0.000219969;
        case 'imperialQuart':
            return volume * 0.000879877;
        case 'imperialPint':
            return volume * 0.001759753;
        case 'imperialFluidOunce':
            return volume * 0.03519507;
        case 'imperialTableSpoon':
            return volume * 0.05631211;
        case 'imperialTeaSpoon':
            return volume * 0.1689363;
        case 'cubicMile':
            return volume * 2.3991e-19;
        case 'cubicYard':
            return volume * 1.30795062e-6;
        case 'cubicFoot':
            return volume * 3.531472e-5;
        case 'cubicInch':
            return volume * 0.06102374;
        default:
            return 'Invalid to unit';
    }
}

function convertFromCubicMillimeter(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 1e-9;
        case 'cubicKilometer':
            return volume * 1e-18;
        case 'cubicCentimeter':
            return volume * 0.001;
        case 'cubicMillimeter':
            return volume;
        case 'liter':
            return volume * 1e-6;
        case 'millimeter':
            return volume * 0.001;
        case 'usGallon':
            return volume * 2.64172e-7;
        case 'usQuart':
            return volume * 1.056688e-6;
        case 'usPint':
            return volume * 2.113376e-6;
        case 'usCup':
            return volume * 4.226752e-6;
        case 'usFluidOunce':
            return volume * 3.381402e-5;
        case 'usTableSpoon':
            return volume * 6.762805e-5;
        case 'imperialGallon':
            return volume * 2.199692e-7;
        case 'imperialQuart':
            return volume * 8.798767e-7;
        case 'imperialPint':
            return volume * 1.759753e-6;
        case 'imperialFluidOunce':
            return volume * 3.519507e-5;
        case 'imperialTableSpoon':
            return volume * 5.631211e-5;
        case 'imperialTeaSpoon':
            return volume * 1.689363e-4;
        case 'cubicMile':
            return volume * 2.3991e-22;
        case 'cubicYard':
            return volume * 1.30795062e-9;
        case 'cubicFoot':
            return volume * 3.531472e-8;
        case 'cubicInch':
            return volume * 6.102374e-5;
        default:
            return 'Invalid to unit';
    }
}

function convertFromLiter(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.001;
        case 'cubicKilometer':
            return volume * 1e-12;
        case 'cubicCentimeter':
            return volume * 1000;
        case 'cubicMillimeter':
            return volume * 1e6;
        case 'liter':
            return volume;
        case 'millimeter':
            return volume * 1e6;
        case 'usGallon':
            return volume * 0.264172;
        case 'usQuart':
            return volume * 1.056688;
        case 'usPint':
            return volume * 2.113376;
        case 'usCup':
            return volume * 4.226752;
        case 'usFluidOunce':
            return volume * 33.814022;
        case 'usTableSpoon':
            return volume * 67.62805;
        case 'imperialGallon':
            return volume * 0.219969;
        case 'imperialQuart':
            return volume * 0.879877;
        case 'imperialPint':
            return volume * 1.759753;
        case 'imperialFluidOunce':
            return volume * 35.19507;
        case 'imperialTableSpoon':
            return volume * 56.31211;
        case 'imperialTeaSpoon':
            return volume * 168.9363;
        case 'cubicMile':
            return volume * 2.3991e-13;
        case 'cubicYard':
            return volume * 0.00130795062;
        case 'cubicFoot':
            return volume * 0.0353147;
        case 'cubicInch':
            return volume * 61.02374;
        default:
            return 'Invalid to unit';
    }
}

function convertFromMillimeter(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 1e-6;
        case 'cubicKilometer':
            return volume * 1e-15;
        case 'cubicCentimeter':
            return volume;
        case 'cubicMillimeter':
            return volume * 1000;
        case 'liter':
            return volume * 0.001;
        case 'millimeter':
            return volume;
        case 'usGallon':
            return volume * 2.64172e-7;
        case 'usQuart':
            return volume * 1.056688e-6;
        case 'usPint':
            return volume * 2.113376e-6;
        case 'usCup':
            return volume * 4.226752e-6;
        case 'usFluidOunce':
            return volume * 3.381402e-5;
        case 'usTableSpoon':
            return volume * 6.762805e-5;
        case 'imperialGallon':
            return volume * 2.199692e-7;
        case 'imperialQuart':
            return volume * 8.798767e-7;
        case 'imperialPint':
            return volume * 1.759753e-6;
        case 'imperialFluidOunce':
            return volume * 3.519507e-5;
        case 'imperialTableSpoon':
            return volume * 5.631211e-5;
        case 'imperialTeaSpoon':
            return volume * 1.689363e-4;
        case 'cubicMile':
            return volume * 2.3991e-19;
        case 'cubicYard':
            return volume * 1.30795062e-6;
        case 'cubicFoot':
            return volume * 3.531472e-5;
        case 'cubicInch':
            return volume * 0.06102374;
        default:
            return 'Invalid to unit';
    }
}

function convertFromUSGallon(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.00378541;
        case 'cubicKilometer':
            return volume * 9.081e-13;
        case 'cubicCentimeter':
            return volume * 3785.41;
        case 'cubicMillimeter':
            return volume * 3.78541e6;
        case 'liter':
            return volume * 3.78541;
        case 'millimeter':
            return volume * 3.78541e6;
        case 'usGallon':
            return volume;
        case 'usQuart':
            return volume * 4;
        case 'usPint':
            return volume * 8;
        case 'usCup':
            return volume * 16;
        case 'usFluidOunce':
            return volume * 128;
        case 'usTableSpoon':
            return volume * 256;
        case 'imperialGallon':
            return volume * 0.832674;
        case 'imperialQuart':
            return volume * 3.3307;
        case 'imperialPint':
            return volume * 6.66139;
        case 'imperialFluidOunce':
            return volume * 133.227;
        case 'imperialTableSpoon':
            return volume * 213.163;
        case 'imperialTeaSpoon':
            return volume * 639.489;
        case 'cubicMile':
            return volume * 9.081e-16;
        case 'cubicYard':
            return volume * 0.00495113;
        case 'cubicFoot':
            return volume * 0.133681;
        case 'cubicInch':
            return volume * 231;
        default:
            return 'Invalid to unit';
    }
}

function convertFromUSQuart(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.000946353;
        case 'cubicKilometer':
            return volume * 2.27e-13;
        case 'cubicCentimeter':
            return volume * 946.353;
        case 'cubicMillimeter':
            return volume * 946353;
        case 'liter':
            return volume * 0.946353;
        case 'millimeter':
            return volume * 946353;
        case 'usGallon':
            return volume * 0.25;
        case 'usQuart':
            return volume;
        case 'usPint':
            return volume * 2;
        case 'usCup':
            return volume * 4;
        case 'usFluidOunce':
            return volume * 32;
        case 'usTableSpoon':
            return volume * 64;
        case 'imperialGallon':
            return volume * 0.208168;
        case 'imperialQuart':
            return volume * 0.832674;
        case 'imperialPint':
            return volume * 1.66535;
        case 'imperialFluidOunce':
            return volume * 33.307;
        case 'imperialTableSpoon':
            return volume * 53.2911;
        case 'imperialTeaSpoon':
            return volume * 159.873;
        case 'cubicMile':
            return volume * 2.27e-16;
        case 'cubicYard':
            return volume * 0.00123778;
        case 'cubicFoot':
            return volume * 0.0334201;
        case 'cubicInch':
            return volume * 57.75;
        default:
            return 'Invalid to unit';
    }
}

function convertFromUSPint(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.000473176;
        case 'cubicKilometer':
            return volume * 1.14e-13;
        case 'cubicCentimeter':
            return volume * 473.176;
        case 'cubicMillimeter':
            return volume * 473176;
        case 'liter':
            return volume * 0.473176;
        case 'millimeter':
            return volume * 473176;
        case 'usGallon':
            return volume * 0.125;
        case 'usQuart':
            return volume * 0.5;
        case 'usPint':
            return volume;
        case 'usCup':
            return volume * 2;
        case 'usFluidOunce':
            return volume * 16;
        case 'usTableSpoon':
            return volume * 32;
        case 'imperialGallon':
            return volume * 0.104084;
        case 'imperialQuart':
            return volume * 0.416337;
        case 'imperialPint':
            return volume * 0.832674;
        case 'imperialFluidOunce':
            return volume * 16.6535;
        case 'imperialTableSpoon':
            return volume * 26.6457;
        case 'imperialTeaSpoon':
            return volume * 79.9372;
        case 'cubicMile':
            return volume * 1.14e-16;
        case 'cubicYard':
            return volume * 0.000618891;
        case 'cubicFoot':
            return volume * 0.0167101;
        case 'cubicInch':
            return volume * 28.875;
        default:
            return 'Invalid to unit';
    }
}

function convertFromUSCup(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.00024;
        case 'cubicKilometer':
            return volume * 5.76e-14;
        case 'cubicCentimeter':
            return volume * 240;
        case 'cubicMillimeter':
            return volume * 240000;
        case 'liter':
            return volume * 0.24;
        case 'millimeter':
            return volume * 240000;
        case 'usGallon':
            return volume * 0.0634013;
        case 'usQuart':
            return volume * 0.253605;
        case 'usPint':
            return volume * 0.50721;
        case 'usCup':
            return volume;
        case 'usFluidOunce':
            return volume * 8;
        case 'usTableSpoon':
            return volume * 16;
        case 'imperialGallon':
            return volume * 0.0520421;
        case 'imperialQuart':
            return volume * 0.208168;
        case 'imperialPint':
            return volume * 0.416337;
        case 'imperialFluidOunce':
            return volume * 8.32674;
        case 'imperialTableSpoon':
            return volume * 13.322;
        case 'imperialTeaSpoon':
            return volume * 39.966;
        case 'cubicMile':
            return volume * 5.76e-17;
        case 'cubicYard':
            return volume * 0.000312891;
        case 'cubicFoot':
            return volume * 0.00844674;
        case 'cubicInch':
            return volume * 14.438;
        default:
            return 'Invalid to unit';
    }
}

function convertFromUSFluidOunce(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 2.95735e-5;
        case 'cubicKilometer':
            return volume * 7.1e-15;
        case 'cubicCentimeter':
            return volume * 29.5735;
        case 'cubicMillimeter':
            return volume * 29573.5;
        case 'liter':
            return volume * 0.0295735;
        case 'millimeter':
            return volume * 29573.5;
        case 'usGallon':
            return volume * 0.00750594;
        case 'usQuart':
            return volume * 0.0300238;
        case 'usPint':
            return volume * 0.0600475;
        case 'usCup':
            return volume * 0.125;
        case 'usFluidOunce':
            return volume;
        case 'usTableSpoon':
            return volume * 2;
        case 'imperialGallon':
            return volume * 0.00625;
        case 'imperialQuart':
            return volume * 0.025;
        case 'imperialPint':
            return volume * 0.05;
        case 'imperialFluidOunce':
            return volume * 1.6;
        case 'imperialTableSpoon':
            return volume * 1.6;
        case 'imperialTeaSpoon':
            return volume * 4.8;
        case 'cubicMile':
            return volume * 7.1e-18;
        case 'cubicYard':
            return volume * 3.86811e-6;
        case 'cubicFoot':
            return volume * 0.000104028;
        case 'cubicInch':
            return volume * 0.178074;
        default:
            return 'Invalid to unit';
    }
}

function convertFromUSTableSpoon(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 1.47868e-5;
        case 'cubicKilometer':
            return volume * 3.55e-15;
        case 'cubicCentimeter':
            return volume * 14.7868;
        case 'cubicMillimeter':
            return volume * 14786.8;
        case 'liter':
            return volume * 0.0147868;
        case 'millimeter':
            return volume * 14786.8;
        case 'usGallon':
            return volume * 0.00375297;
        case 'usQuart':
            return volume * 0.0150119;
        case 'usPint':
            return volume * 0.0300238;
        case 'usCup':
            return volume * 0.0625;
        case 'usFluidOunce':
            return volume * 2;
        case 'usTableSpoon':
            return volume;
        case 'imperialGallon':
            return volume * 0.00208333;
        case 'imperialQuart':
            return volume * 0.00833333;
        case 'imperialPint':
            return volume * 0.0166667;
        case 'imperialFluidOunce':
            return volume * 0.533333;
        case 'imperialTableSpoon':
            return volume * 0.666667;
        case 'imperialTeaSpoon':
            return volume * 2;
        case 'cubicMile':
            return volume * 3.55e-18;
        case 'cubicYard':
            return volume * 1.93405e-6;
        case 'cubicFoot':
            return volume * 5.20142e-5;
        case 'cubicInch':
            return volume * 0.089037;
        default:
            return 'Invalid to unit';
    }
}

function convertFromImperialGallon(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 4.54609;
        case 'cubicKilometer':
            return volume * 1.091e-12;
        case 'cubicCentimeter':
            return volume * 4546090;
        case 'cubicMillimeter':
            return volume * 4.54609e9;
        case 'liter':
            return volume * 4546.09;
        case 'millimeter':
            return volume * 4.54609e6;
        case 'usGallon':
            return volume * 1.20095;
        case 'usQuart':
            return volume * 4.8038;
        case 'usPint':
            return volume * 9.6076;
        case 'usCup':
            return volume * 19.2152;
        case 'usFluidOunce':
            return volume * 153.722;
        case 'usTableSpoon':
            return volume * 307.443;
        case 'imperialGallon':
            return volume;
        case 'imperialQuart':
            return volume * 4;
        case 'imperialPint':
            return volume * 8;
        case 'imperialFluidOunce':
            return volume * 160;
        case 'imperialTableSpoon':
            return volume * 256;
        case 'imperialTeaSpoon':
            return volume * 768;
        case 'cubicMile':
            return volume * 1.091e-15;
        case 'cubicYard':
            return volume * 627.272;
        case 'cubicFoot':
            return volume * 16813.6;
        case 'cubicInch':
            return volume * 2919821;
        default:
            return 'Invalid to unit';
    }
}

function convertFromImperialQuart(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 1.13652;
        case 'cubicKilometer':
            return volume * 2.72744e-13;
        case 'cubicCentimeter':
            return volume * 1136520;
        case 'cubicMillimeter':
            return volume * 1.13652e9;
        case 'liter':
            return volume * 1136.52;
        case 'millimeter':
            return volume * 1.13652e6;
        case 'usGallon':
            return volume * 0.299082;
        case 'usQuart':
            return volume * 1.19633;
        case 'usPint':
            return volume * 2.39265;
        case 'usCup':
            return volume * 4.78531;
        case 'usFluidOunce':
            return volume * 38.2265;
        case 'usTableSpoon':
            return volume * 76.4531;
        case 'imperialGallon':
            return volume * 0.25;
        case 'imperialQuart':
            return volume;
        case 'imperialPint':
            return volume * 2;
        case 'imperialFluidOunce':
            return volume * 40;
        case 'imperialTableSpoon':
            return volume * 64;
        case 'imperialTeaSpoon':
            return volume * 192;
        case 'cubicMile':
            return volume * 2.72744e-16;
        case 'cubicYard':
            return volume * 156.818;
        case 'cubicFoot':
            return volume * 4224.84;
        case 'cubicInch':
            return volume * 729983;
        default:
            return 'Invalid to unit';
    }
}

function convertFromImperialPint(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.568261;
        case 'cubicKilometer':
            return volume * 1.36372e-13;
        case 'cubicCentimeter':
            return volume * 568261;
        case 'cubicMillimeter':
            return volume * 568261000;
        case 'liter':
            return volume * 568.261;
        case 'millimeter':
            return volume * 568261000;
        case 'usGallon':
            return volume * 0.149541;
        case 'usQuart':
            return volume * 0.598261;
        case 'usPint':
            return volume * 1.19652;
        case 'usCup':
            return volume * 2.39265;
        case 'usFluidOunce':
            return volume * 19.1132;
        case 'usTableSpoon':
            return volume * 38.2265;
        case 'imperialGallon':
            return volume * 0.125;
        case 'imperialQuart':
            return volume * 0.5;
        case 'imperialPint':
            return volume;
        case 'imperialFluidOunce':
            return volume * 20;
        case 'imperialTableSpoon':
            return volume * 32;
        case 'imperialTeaSpoon':
            return volume * 96;
        case 'cubicMile':
            return volume * 1.36372e-16;
        case 'cubicYard':
            return volume * 78.409;
        case 'cubicFoot':
            return volume * 2112.42;
        case 'cubicInch':
            return volume * 364991;
        default:
            return 'Invalid to unit';
    }
}

function convertFromImperialFluidOunce(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.0284131;
        case 'cubicKilometer':
            return volume * 6.83e-15;
        case 'cubicCentimeter':
            return volume * 28.4131;
        case 'cubicMillimeter':
            return volume * 28413.1;
        case 'liter':
            return volume * 0.0284131;
        case 'millimeter':
            return volume * 28413.1;
        case 'usGallon':
            return volume * 0.00750594;
        case 'usQuart':
            return volume * 0.0300238;
        case 'usPint':
            return volume * 0.0600475;
        case 'usCup':
            return volume * 0.120095;
        case 'usFluidOunce':
            return volume * 0.960764;
        case 'usTableSpoon':
            return volume * 1.92149;
        case 'imperialGallon':
            return volume * 0.00625;
        case 'imperialQuart':
            return volume * 0.025;
        case 'imperialPint':
            return volume * 0.05;
        case 'imperialFluidOunce':
            return volume;
        case 'imperialTableSpoon':
            return volume * 1.6;
        case 'imperialTeaSpoon':
            return volume * 4.8;
        case 'cubicMile':
            return volume * 6.83e-18;
        case 'cubicYard':
            return volume * 0.000393074;
        case 'cubicFoot':
            return volume * 0.0106496;
        case 'cubicInch':
            return volume * 1.8361;
        default:
            return 'Invalid to unit';
    }
}

function convertFromImperialTableSpoon(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.0177582;
        case 'cubicKilometer':
            return volume * 4.27e-15;
        case 'cubicCentimeter':
            return volume * 17.7582;
        case 'cubicMillimeter':
            return volume * 17758.2;
        case 'liter':
            return volume * 0.0177582;
        case 'millimeter':
            return volume * 17758.2;
        case 'usGallon':
            return volume * 0.00468895;
        case 'usQuart':
            return volume * 0.0187558;
        case 'usPint':
            return volume * 0.0375116;
        case 'usCup':
            return volume * 0.0750233;
        case 'usFluidOunce':
            return volume * 0.600186;
        case 'usTableSpoon':
            return volume * 1.20037;
        case 'imperialGallon':
            return volume * 0.00390625;
        case 'imperialQuart':
            return volume * 0.015625;
        case 'imperialPint':
            return volume * 0.03125;
        case 'imperialFluidOunce':
            return volume * 0.640;
        case 'imperialTableSpoon':
            return volume;
        case 'imperialTeaSpoon':
            return volume * 3;
        case 'cubicMile':
            return volume * 4.27e-18;
        case 'cubicYard':
            return volume * 0.000245673;
        case 'cubicFoot':
            return volume * 0.00664857;
        case 'cubicInch':
            return volume * 1.14599;
        default:
            return 'Invalid to unit';
    }
}

function convertFromImperialTeaSpoon(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.00591941;
        case 'cubicKilometer':
            return volume * 1.42e-15;
        case 'cubicCentimeter':
            return volume * 5.91941;
        case 'cubicMillimeter':
            return volume * 5919.41;
        case 'liter':
            return volume * 0.00591941;
        case 'millimeter':
            return volume * 5919.41;
        case 'usGallon':
            return volume * 0.001563;
        case 'usQuart':
            return volume * 0.00625205;
        case 'usPint':
            return volume * 0.0125041;
        case 'usCup':
            return volume * 0.0250082;
        case 'usFluidOunce':
            return volume * 0.200065;
        case 'usTableSpoon':
            return volume * 0.40013;
        case 'imperialGallon':
            return volume * 0.00130208;
        case 'imperialQuart':
            return volume * 0.00520833;
        case 'imperialPint':
            return volume * 0.0104167;
        case 'imperialFluidOunce':
            return volume * 0.208333;
        case 'imperialTableSpoon':
            return volume * 0.333333;
        case 'imperialTeaSpoon':
            return volume;
        case 'cubicMile':
            return volume * 1.42e-18;
        case 'cubicYard':
            return volume * 8.19091e-5;
        case 'cubicFoot':
            return volume * 0.00221619;
        case 'cubicInch':
            return volume * 0.381997;
        default:
            return 'Invalid to unit';
    }
}

function convertFromCubicMile(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 4.16818e15;
        case 'cubicKilometer':
            return volume * 4.16818;
        case 'cubicCentimeter':
            return volume * 4.16818e21;
        case 'cubicMillimeter':
            return volume * 4.16818e24;
        case 'liter':
            return volume * 4.16818e15;
        case 'millimeter':
            return volume * 4.16818e24;
        case 'usGallon':
            return volume * 1.10109e12;
        case 'usQuart':
            return volume * 4.40435e12;
        case 'usPint':
            return volume * 8.80871e12;
        case 'usCup':
            return volume * 1.76174e13;
        case 'usFluidOunce':
            return volume * 1.40939e14;
        case 'usTableSpoon':
            return volume * 2.81878e14;
        case 'imperialGallon':
            return volume * 9.23739e11;
        case 'imperialQuart':
            return volume * 3.69496e12;
        case 'imperialPint':
            return volume * 7.38992e12;
        case 'imperialFluidOunce':
            return volume * 1.47798e14;
        case 'imperialTableSpoon':
            return volume * 2.36476e14;
        case 'imperialTeaSpoon':
            return volume * 7.09429e14;
        case 'cubicMile':
            return volume;
        case 'cubicYard':
            return volume * 5451776000;
        case 'cubicFoot':
            return volume * 147197952000;
        case 'cubicInch':
            return volume * 254358061875251;
        default:
            return 'Invalid to unit';
    }
}

function convertFromCubicYard(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.764554857;
        case 'cubicKilometer':
            return volume * 1.83421e-13;
        case 'cubicCentimeter':
            return volume * 764554.857;
        case 'cubicMillimeter':
            return volume * 764554857;
        case 'liter':
            return volume * 764.554857;
        case 'millimeter':
            return volume * 764554857;
        case 'usGallon':
            return volume * 201.974;
        case 'usQuart':
            return volume * 807.896;
        case 'usPint':
            return volume * 1615.79;
        case 'usCup':
            return volume * 3231.58;
        case 'usFluidOunce':
            return volume * 25852.6;
        case 'usTableSpoon':
            return volume * 51705.2;
        case 'imperialGallon':
            return volume * 168.178;
        case 'imperialQuart':
            return volume * 672.713;
        case 'imperialPint':
            return volume * 1345.43;
        case 'imperialFluidOunce':
            return volume * 26908.6;
        case 'imperialTableSpoon':
            return volume * 43054.2;
        case 'imperialTeaSpoon':
            return volume * 129162;
        case 'cubicMile':
            return volume * 1.83421e-16;
        case 'cubicYard':
            return volume;
        case 'cubicFoot':
            return volume * 27;
        case 'cubicInch':
            return volume * 46656;
        default:
            return 'Invalid to unit';
    }
}

function convertFromCubicFoot(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.0283168;
        case 'cubicKilometer':
            return volume * 6.7936e-15;
        case 'cubicCentimeter':
            return volume * 28316.8;
        case 'cubicMillimeter':
            return volume * 28316800;
        case 'liter':
            return volume * 28.3168;
        case 'millimeter':
            return volume * 28316800;
        case 'usGallon':
            return volume * 7.48052;
        case 'usQuart':
            return volume * 29.9221;
        case 'usPint':
            return volume * 59.8442;
        case 'usCup':
            return volume * 119.688;
        case 'usFluidOunce':
            return volume * 957.506;
        case 'usTableSpoon':
            return volume * 1915.01;
        case 'imperialGallon':
            return volume * 6.22884;
        case 'imperialQuart':
            return volume * 24.9154;
        case 'imperialPint':
            return volume * 49.8309;
        case 'imperialFluidOunce':
            return volume * 996.618;
        case 'imperialTableSpoon':
            return volume * 1594.59;
        case 'imperialTeaSpoon':
            return volume * 4783.77;
        case 'cubicMile':
            return volume * 6.7936e-18;
        case 'cubicYard':
            return volume * 0.037037;
        case 'cubicFoot':
            return volume;
        case 'cubicInch':
            return volume * 1728;
        default:
            return 'Invalid to unit';
    }
}

function convertFromCubicInch(volume, toUnit) {
    switch (toUnit) {
        case 'cubicMeter':
            return volume * 0.0000163871;
        case 'cubicKilometer':
            return volume * 3.927e-21;
        case 'cubicCentimeter':
            return volume * 16.3871;
        case 'cubicMillimeter':
            return volume * 16387.1;
        case 'liter':
            return volume * 0.0163871;
        case 'millimeter':
            return volume * 16387.1;
        case 'usGallon':
            return volume * 0.004329;
        case 'usQuart':
            return volume * 0.017316;
        case 'usPint':
            return volume * 0.034632;
        case 'usCup':
            return volume * 0.069264;
        case 'usFluidOunce':
            return volume * 0.554113;
        case 'usTableSpoon':
            return volume * 1.10823;
        case 'imperialGallon':
            return volume * 0.00360465;
        case 'imperialQuart':
            return volume * 0.0144186;
        case 'imperialPint':
            return volume * 0.0288372;
        case 'imperialFluidOunce':
            return volume * 0.576744;
        case 'imperialTableSpoon':
            return volume * 0.92279;
        case 'imperialTeaSpoon':
            return volume * 2.76838;
        case 'cubicMile':
            return volume * 3.927e-21;
        case 'cubicYard':
            return volume * 0.0000214335;
        case 'cubicFoot':
            return volume * 0.000578704;
        case 'cubicInch':
            return volume;
        default:
            return 'Invalid to unit';
    }
}

//** TIME CONVERTER */ 
function convertTime() {
    // Get input values
    const inputTime = parseFloat(document.getElementById('inputTime').value);
    const fromUnit = document.getElementById('fromTimeUnit').value;
    const toUnit = document.getElementById('toTimeUnit').value;

    // Perform conversion
    let result;
    switch (fromUnit) {
        case 'second':
            result = convertFromSecond(inputTime, toUnit);
            break;
        case 'millisecond':
            result = convertFromMillisecond(inputTime, toUnit);
            break;
        case 'microsecond':
            result = convertFromMicrosecond(inputTime, toUnit);
            break;
        case 'nanosecond':
            result = convertFromNanosecond(inputTime, toUnit);
            break;
        case 'picosecond':
            result = convertFromPicosecond(inputTime, toUnit);
            break;
        case 'minute':
            result = convertFromMinute(inputTime, toUnit);
            break;
        case 'hour':
            result = convertFromHour(inputTime, toUnit);
            break;
        case 'day':
            result = convertFromDay(inputTime, toUnit);
            break;
        case 'week':
            result = convertFromWeek(inputTime, toUnit);
            break;
        case 'month':
            result = convertFromMonth(inputTime, toUnit);
            break;
        case 'year':
            result = convertFromYear(inputTime, toUnit);
            break;
        default:
            result = 'Invalid from unit';
    }

    // Display result
    document.getElementById('timeResult').innerHTML = inputTime + ' ' + fromUnit + ' is ' + result + ' ' + toUnit;
}

function convertFromSecond(time, toUnit) {
    switch (toUnit) {
        case 'second':
            return time;
        case 'millisecond':
            return time * 1000;
        case 'microsecond':
            return time * 1e+6;
        case 'nanosecond':
            return time * 1e+9;
        case 'picosecond':
            return time * 1e+12;
        case 'minute':
            return time / 60;
        case 'hour':
            return time / 3600;
        case 'day':
            return time / (3600 * 24);
        case 'week':
            return time / (3600 * 24 * 7);
        case 'month':
            // Assuming an average month length of 30.44 days
            return time / (3600 * 24 * 30.44);
        case 'year':
            // Assuming an average year length of 365.25 days
            return time / (3600 * 24 * 365.25);
        default:
            return 'Invalid to unit';
    }
}

function convertFromMillisecond(time, toUnit) {
    switch (toUnit) {
        case 'second':
            return time * 0.001;
        case 'millisecond':
            return time;
        case 'microsecond':
            return time * 1e+3;
        case 'nanosecond':
            return time * 1e+6;
        case 'picosecond':
            return time * 1e+9;
        case 'minute':
            return time / (60 * 1000);
        case 'hour':
            return time / (3600 * 1000);
        case 'day':
            return time / (3600 * 24 * 1000);
        case 'week':
            return time / (3600 * 24 * 7 * 1000);
        case 'month':
            return time / (3600 * 24 * 30.44 * 1000);
        case 'year':
            return time / (3600 * 24 * 365.25 * 1000);
        default:
            return 'Invalid to unit';
    }
}

function convertFromMicrosecond(time, toUnit) {
    switch (toUnit) {
        case 'second':
            return time * 1e-6;
        case 'millisecond':
            return time * 0.001;
        case 'microsecond':
            return time;
        case 'nanosecond':
            return time * 1e+3;
        case 'picosecond':
            return time * 1e+6;
        case 'minute':
            return time / (60 * 1e+6);
        case 'hour':
            return time / (3600 * 1e+6);
        case 'day':
            return time / (3600 * 24 * 1e+6);
        case 'week':
            return time / (3600 * 24 * 7 * 1e+6);
        case 'month':
            return time / (3600 * 24 * 30.44 * 1e+6);
        case 'year':
            return time / (3600 * 24 * 365.25 * 1e+6);
        default:
            return 'Invalid to unit';
    }
}

function convertFromNanosecond(time, toUnit) {
    switch (toUnit) {
        case 'second':
            return time * 1e-9;
        case 'millisecond':
            return time * 1e-6;
        case 'microsecond':
            return time * 1e-3;
        case 'nanosecond':
            return time;
        case 'picosecond':
            return time * 1e+3;
        case 'minute':
            return time / (60 * 1e+9);
        case 'hour':
            return time / (3600 * 1e+9);
        case 'day':
            return time / (3600 * 24 * 1e+9);
        case 'week':
            return time / (3600 * 24 * 7 * 1e+9);
        case 'month':
            return time / (3600 * 24 * 30.44 * 1e+9);
        case 'year':
            return time / (3600 * 24 * 365.25 * 1e+9);
        default:
            return 'Invalid to unit';
    }
}

function convertFromPicosecond(time, toUnit) {
    switch (toUnit) {
        case 'second':
            return time * 1e-12;
        case 'millisecond':
            return time * 1e-9;
        case 'microsecond':
            return time * 1e-6;
        case 'nanosecond':
            return time * 1e-3;
        case 'picosecond':
            return time;
        case 'minute':
            return time / (60 * 1e+12);
        case 'hour':
            return time / (3600 * 1e+12);
        case 'day':
            return time / (3600 * 24 * 1e+12);
        case 'week':
            return time / (3600 * 24 * 7 * 1e+12);
        case 'month':
            return time / (3600 * 24 * 30.44 * 1e+12);
        case 'year':
            return time / (3600 * 24 * 365.25 * 1e+12);
        default:
            return 'Invalid to unit';
    }
}

function convertFromMinute(time, toUnit) {
    switch (toUnit) {
        case 'second':
            return time * 60;
        case 'millisecond':
            return time * 60 * 1000;
        case 'microsecond':
            return time * 60 * 1e+6;
        case 'nanosecond':
            return time * 60 * 1e+9;
        case 'picosecond':
            return time * 60 * 1e+12;
        case 'minute':
            return time;
        case 'hour':
            return time / 60;
        case 'day':
            return time / (24 * 60);
        case 'week':
            return time / (24 * 60 * 7);
        case 'month':
            // Assuming an average month length of 30.44 days
            return time / (24 * 60 * 30.44);
        case 'year':
            // Assuming an average year length of 365.25 days
            return time / (24 * 60 * 365.25);
        default:
            return 'Invalid to unit';
    }
}

function convertFromHour(time, toUnit) {
    switch (toUnit) {
        case 'second':
            return time * 3600;
        case 'millisecond':
            return time * 3600 * 1000;
        case 'microsecond':
            return time * 3600 * 1e+6;
        case 'nanosecond':
            return time * 3600 * 1e+9;
        case 'picosecond':
            return time * 3600 * 1e+12;
        case 'minute':
            return time * 60;
        case 'hour':
            return time;
        case 'day':
            return time / 24;
        case 'week':
            return time / (24 * 7);
        case 'month':
            // Assuming an average month length of 30.44 days
            return time / (24 * 30.44);
        case 'year':
            // Assuming an average year length of 365.25 days
            return time / (24 * 365.25);
        default:
            return 'Invalid to unit';
    }
}

function convertFromDay(time, toUnit) {
    switch (toUnit) {
        case 'second':
            return time * 24 * 3600;
        case 'millisecond':
            return time * 24 * 3600 * 1000;
        case 'microsecond':
            return time * 24 * 3600 * 1e+6;
        case 'nanosecond':
            return time * 24 * 3600 * 1e+9;
        case 'picosecond':
            return time * 24 * 3600 * 1e+12;
        case 'minute':
            return time * 24 * 60;
        case 'hour':
            return time * 24;
        case 'day':
            return time;
        case 'week':
            return time / 7;
        case 'month':
            // Assuming an average month length of 30.44 days
            return time / 30.44;
        case 'year':
            // Assuming an average year length of 365.25 days
            return time / 365.25;
        default:
            return 'Invalid to unit';
    }
}

function convertFromWeek(time, toUnit) {
    switch (toUnit) {
        case 'second':
            return time * 7 * 24 * 3600;
        case 'millisecond':
            return time * 7 * 24 * 3600 * 1000;
        case 'microsecond':
            return time * 7 * 24 * 3600 * 1e+6;
        case 'nanosecond':
            return time * 7 * 24 * 3600 * 1e+9;
        case 'picosecond':
            return time * 7 * 24 * 3600 * 1e+12;
        case 'minute':
            return time * 7 * 24 * 60;
        case 'hour':
            return time * 7 * 24;
        case 'day':
            return time * 7;
        case 'week':
            return time;
        case 'month':
            // Assuming an average month length of 30.44 days
            return time / (4.34821 * 7);
        case 'year':
            // Assuming an average year length of 365.25 days
            return time / (52.1775);
        default:
            return 'Invalid to unit';
    }
}

function convertFromMonth(time, toUnit) {
    switch (toUnit) {
        case 'second':
            // Assuming an average month length of 30.44 days
            return time * 30.44 * 24 * 3600;
        case 'millisecond':
            // Assuming an average month length of 30.44 days
            return time * 30.44 * 24 * 3600 * 1000;
        case 'microsecond':
            // Assuming an average month length of 30.44 days
            return time * 30.44 * 24 * 3600 * 1e+6;
        case 'nanosecond':
            // Assuming an average month length of 30.44 days
            return time * 30.44 * 24 * 3600 * 1e+9;
        case 'picosecond':
            // Assuming an average month length of 30.44 days
            return time * 30.44 * 24 * 3600 * 1e+12;
        case 'minute':
            // Assuming an average month length of 30.44 days
            return time * 30.44 * 24 * 60;
        case 'hour':
            // Assuming an average month length of 30.44 days
            return time * 30.44 * 24;
        case 'day':
            // Assuming an average month length of 30.44 days
            return time * 30.44;
        case 'week':
            // Assuming an average month length of 30.44 days
            return time * (4.34821);
        case 'month':
            return time;
        case 'year':
            return time / 12;
        default:
            return 'Invalid to unit';
    }
}

function convertFromYear(time, toUnit) {
    switch (toUnit) {
        case 'second':
            // Assuming an average year length of 365.25 days
            return time * 365.25 * 24 * 3600;
        case 'millisecond':
            // Assuming an average year length of 365.25 days
            return time * 365.25 * 24 * 3600 * 1000;
        case 'microsecond':
            // Assuming an average year length of 365.25 days
            return time * 365.25 * 24 * 3600 * 1e+6;
        case 'nanosecond':
            // Assuming an average year length of 365.25 days
            return time * 365.25 * 24 * 3600 * 1e+9;
        case 'picosecond':
            // Assuming an average year length of 365.25 days
            return time * 365.25 * 24 * 3600 * 1e+12;
        case 'minute':
            // Assuming an average year length of 365.25 days
            return time * 365.25 * 24 * 60;
        case 'hour':
            // Assuming an average year length of 365.25 days
            return time * 365.25 * 24;
        case 'day':
            // Assuming an average year length of 365.25 days
            return time * 365.25;
        case 'week':
            // Assuming an average year length of 365.25 days
            return time * (52.1775);
        case 'month':
            return time * 12;
        case 'year':
            return time;
        default:
            return 'Invalid to unit';
    }
}

//** TEMPERATURE CONVERTER */
function convertTemperature() {
    // Get input values
    const inputTemperature = parseFloat(document.getElementById('inputTemperature').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    // Perform conversion
    let result;
    switch (fromUnit) {
        case 'celsius':
            result = convertFromCelsius(inputTemperature, toUnit);
            break;
        case 'fahrenheit':
            result = convertFromFahrenheit(inputTemperature, toUnit);
            break;
        case 'kelvin':
            result = convertFromKelvin(inputTemperature, toUnit);
            break;
        default:
            result = 'Invalid from unit';
    }

    // Display result
    document.getElementById('result').innerHTML = inputTemperature + ' ' + fromUnit + ' is ' + result + ' ' + toUnit;
}

function convertFromCelsius(temperature, toUnit) {
    switch (toUnit) {
        case 'celsius':
            return temperature;
        case 'fahrenheit':
            return (temperature * 9/5) + 32;
        case 'kelvin':
            return temperature + 273.15;
        default:
            return 'Invalid to unit';
    }
}

function convertFromFahrenheit(temperature, toUnit) {
    switch (toUnit) {
        case 'celsius':
            return (temperature - 32) * 5/9;
        case 'fahrenheit':
            return temperature;
        case 'kelvin':
            return (temperature - 32) * 5/9 + 273.15;
        default:
            return 'Invalid to unit';
    }
}

function convertFromKelvin(temperature, toUnit) {
    switch (toUnit) {
        case 'celsius':
            return temperature - 273.15;
        case 'fahrenheit':
            return (temperature - 273.15) * 9/5 + 32;
        case 'kelvin':
            return temperature;
        default:
            return 'Invalid to unit';
    }
}

//** LENGTH CONVERTER */
function convertLength() {
    // Get input values
    const inputLength = parseFloat(document.getElementById('inputLength').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    // Perform conversion
    var result;
    switch (fromUnit) {
        case 'meter':
            result = convertFromMeter(inputLength, toUnit);
            break;
        case 'centimeter':
            result = convertFromCentimeter(inputLength, toUnit);
            break;
        case 'millimeter':
            result = convertFromMillimeter(inputLength, toUnit);
            break;
        case 'micrometer':
            result = convertFromMicrometer(inputLength, toUnit);
            break;
        case 'nanometer':
            result = convertFromNanometer(inputLength, toUnit);
            break;
        case 'kilometer':
            result = convertFromKilometer(inputLength, toUnit);
            break;
        case 'mile':
            result = convertFromMile(inputLength, toUnit);
            break;
        case 'yard':
            result = convertFromYard(inputLength, toUnit);
            break;
        case 'foot':
            result = convertFromFoot(inputLength, toUnit);
            break;
        case 'inch':
            result = convertFromInch(inputLength, toUnit);
            break;
        case 'lightyear':
            result = convertFromLightYear(inputLength, toUnit);
            break;
        default:
            result = 'Invalid from unit';
    }

    // Display result
    document.getElementById('result').innerHTML = inputLength + ' ' + fromUnit + ' is ' + result + ' ' + toUnit;
}

function convertFromMeter(length, toUnit) {
    switch (toUnit) {
        case 'meter':
            return length;
        case 'centimeter':
            return length * 100;
        case 'millimeter':
            return length * 1000;
        case 'micrometer':
            return length * 1e6;
        case 'nanometer':
            return length * 1e9;
        case 'kilometer':
            return length / 1000;
        case 'mile':
            return length / 1609.34;
        case 'yard':
            return length * 1.09361;
        case 'foot':
            return length * 3.28084;
        case 'inch':
            return length * 39.3701;
        case 'lightyear':
            return length / 9.461e15;
        default:
            return 'Invalid to unit';
    }
}

function convertFromCentimeter(length, toUnit) {
    switch (toUnit) {
        case 'meter':
            return length / 100;
        case 'centimeter':
            return length;
        case 'millimeter':
            return length * 10;
        case 'micrometer':
            return length * 1e4;
        case 'nanometer':
            return length * 1e7;
        case 'kilometer':
            return length / 1e5;
        case 'mile':
            return length / 160934;
        case 'yard':
            return length * 0.0109361;
        case 'foot':
            return length * 0.0328084;
        case 'inch':
            return length * 0.393701;
        case 'lightyear':
            return length / 9.461e16;
        default:
            return 'Invalid to unit';
    }
}

function convertFromMillimeter(length, toUnit) {
    switch (toUnit) {
        case 'meter':
            return length / 1000;
        case 'centimeter':
            return length / 10;
        case 'micrometer':
            return length * 1000;
        case 'nanometer':
            return length * 1e6;
        case 'kilometer':
            return length / 1e6;
        case 'mile':
            return length / 1.609e6;
        case 'yard':
            return length / 914.4;
        case 'foot':
            return length / 304.8;
        case 'inch':
            return length / 25.4;
        case 'lightyear':
            return length / 9.461e18;
        default:
            return 'Invalid to unit';
    }
}

function convertFromMicrometer(length, toUnit) {
    switch (toUnit) {
        case 'meter':
            return length / 1e6;
        case 'centimeter':
            return length / 1e4;
        case 'millimeter':
            return length / 1000;
        case 'nanometer':
            return length * 1000;
        case 'kilometer':
            return length / 1e9;
        case 'mile':
            return length / 1.609e9;
        case 'yard':
            return length / 914400;
        case 'foot':
            return length / 304800;
        case 'inch':
            return length / 25400;
        case 'lightyear':
            return length / 9.461e21;
        default:
            return 'Invalid to unit';
    }
}

function convertFromNanometer(length, toUnit) {
    switch (toUnit) {
        case 'meter':
            return length / 1e9;
        case 'centimeter':
            return length / 1e7;
        case 'millimeter':
            return length / 1e6;
        case 'micrometer':
            return length / 1000;
        case 'kilometer':
            return length / 1e12;
        case 'mile':
            return length / 1.609e12;
        case 'yard':
            return length / 9.144e8;
        case 'foot':
            return length / 3.048e8;
        case 'inch':
            return length / 2.54e7;
        case 'lightyear':
            return length / 9.461e24;
        default:
            return 'Invalid to unit';
    }
}


function convertFromKilometer(length, toUnit) {
    switch (toUnit) {
        case 'meter':
            return length * 1000;
        case 'centimeter':
            return length * 100000;
        case 'millimeter':
            return length * 1e6;
        case 'micrometer':
            return length * 1e9;
        case 'nanometer':
            return length * 1e12;
        case 'mile':
            return length / 1.60934;
        case 'yard':
            return length * 1094;
        case 'foot':
            return length * 3281;
        case 'inch':
            return length * 39370.1;
        case 'lightyear':
            return length / 9.461e12;
        default:
            return 'Invalid to unit';
    }
}

function convertFromMile(length, toUnit) {
    switch (toUnit) {
        case 'meter':
            return length * 1609.34;
        case 'centimeter':
            return length * 160934;
        case 'millimeter':
            return length * 1.609e6;
        case 'micrometer':
            return length * 1.609e9;
        case 'nanometer':
            return length * 1.609e12;
        case 'kilometer':
            return length * 1.60934;
        case 'yard':
            return length * 1760;
        case 'foot':
            return length * 5280;
        case 'inch':
            return length * 63360;
        case 'lightyear':
            return length / 5.879e12;
        default:
            return 'Invalid to unit';
    }
}

function convertFromYard(length, toUnit) {
    switch (toUnit) {
        case 'meter':
            return length * 0.9144;
        case 'centimeter':
            return length * 91.44;
        case 'millimeter':
            return length * 914.4;
        case 'micrometer':
            return length * 9.144e5;
        case 'nanometer':
            return length * 9.144e8;
        case 'kilometer':
            return length * 0.0009144;
        case 'mile':
            return length / 1760;
        case 'foot':
            return length * 3;
        case 'inch':
            return length * 36;
        case 'lightyear':
            return length / 1.057e16;
        default:
            return 'Invalid to unit';
    }
}

function convertFromFoot(length, toUnit) {
    switch (toUnit) {
        case 'meter':
            return length * 0.3048;
        case 'centimeter':
            return length * 30.48;
        case 'millimeter':
            return length * 304.8;
        case 'micrometer':
            return length * 3.048e5;
        case 'nanometer':
            return length * 3.048e8;
        case 'kilometer':
            return length * 0.0003048;
        case 'mile':
            return length / 5280;
        case 'yard':
            return length / 3;
        case 'inch':
            return length * 12;
        case 'lightyear':
            return length / 3.104e16;
        default:
            return 'Invalid to unit';
    }
}

function convertFromInch(length, toUnit) {
    switch (toUnit) {
        case 'meter':
            return length * 0.0254;
        case 'centimeter':
            return length * 2.54;
        case 'millimeter':
            return length * 25.4;
        case 'micrometer':
            return length * 2.54e4;
        case 'nanometer':
            return length * 2.54e7;
        case 'kilometer':
            return length * 2.54e-5;
        case 'mile':
            return length / 63360;
        case 'yard':
            return length / 36;
        case 'foot':
            return length / 12;
        case 'lightyear':
            return length / 9.461e15;
        default:
            return 'Invalid to unit';
    }
}

function convertFromLightYear(length, toUnit) {
    switch (toUnit) {
        case 'meter':
            return length * 9.461e15;
        case 'centimeter':
            return length * 9.461e17;
        case 'millimeter':
            return length * 9.461e18;
        case 'micrometer':
            return length * 9.461e21;
        case 'nanometer':
            return length * 9.461e24;
        case 'kilometer':
            return length * 9.461e12;
        case 'mile':
            return length * 5.878e12;
        case 'yard':
            return length * 1.047e16;
        case 'foot':
            return length * 3.156e16;
        case 'inch':
            return length * 3.787e17;
        default:
            return 'Invalid to unit';
    }
}

//** AREA CONVERTER */
function convertArea() {
    // Get input values
    const inputArea = parseFloat(document.getElementById('inputArea').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    // Perform conversion
    let result;
    switch (fromUnit) {
        case 'squareMeter':
            result = convertFromSquareMeter(inputArea, toUnit);
            break;
        case 'squareKilometer':
            result = convertFromSquareKilometer(inputArea, toUnit);
            break;
        case 'squareCentimeter':
            result = convertFromSquareCentimeter(inputArea, toUnit);
            break;
        case 'squareMillimeter':
            result = convertFromSquareMillimeter(inputArea, toUnit);
            break;
        case 'squareMicrometer':
            result = convertFromSquareMicrometer(inputArea, toUnit);
            break;
        case 'hectare':
            result = convertFromHectare(inputArea, toUnit);
            break;
        case 'squareMile':
            result = convertFromSquareMile(inputArea, toUnit);
            break;
        case 'squareYard':
            result = convertFromSquareYard(inputArea, toUnit);
            break;
        case 'squareFoot':
            result = convertFromSquareFoot(inputArea, toUnit);
            break;
        case 'squareInch':
            result = convertFromSquareInch(inputArea, toUnit);
            break;
        case 'acre':
            result = convertFromAcre(inputArea, toUnit);
            break;
        default:
            result = 'Invalid from unit';
    }

    // Display result
    document.getElementById('result').innerHTML = inputArea + ' ' + fromUnit + ' is ' + result + ' ' + toUnit;
}

// Conversion functions
function convertFromSquareMeter(area, toUnit) {
    switch (toUnit) {
        case 'squareMeter':
            return area;
        case 'squareKilometer':
            return area / 1e6;
        case 'squareCentimeter':
            return area * 1e4;
        case 'squareMillimeter':
            return area * 1e6;
        case 'squareMicrometer':
            return area * 1e12;
        case 'hectare':
            return area / 10000;
        case 'squareMile':
            return area / 2.59e6;
        case 'squareYard':
            return area * 1.19599;
        case 'squareFoot':
            return area * 10.7639;
        case 'squareInch':
            return area * 1550.0031;
        case 'acre':
            return area / 4046.856;
        default:
            return 'Invalid to unit';
    }
}


function convertFromSquareKilometer(area, toUnit) {
    switch (toUnit) {
        case 'squareMeter':
            return area * 1e6;
        case 'squareKilometer':
            return area;
        case 'squareCentimeter':
            return area * 1e10;
        case 'squareMillimeter':
            return area * 1e12;
        case 'squareMicrometer':
            return area * 1e18;
        case 'hectare':
            return area * 1e4;
        case 'squareMile':
            return area * 0.239913;
        case 'squareYard':
            return area * 1.19599e6;
        case 'squareFoot':
            return area * 1.07639e7;
        case 'squareInch':
            return area * 1.550e9;
        case 'acre':
            return area * 247.105;
        default:
            return 'Invalid to unit';
    }
}

function convertFromSquareCentimeter(area, toUnit) {
    switch (toUnit) {
        case 'squareMeter':
            return area * 1e-4;
        case 'squareKilometer':
            return area * 1e-10;
        case 'squareCentimeter':
            return area;
        case 'squareMillimeter':
            return area * 100;
        case 'squareMicrometer':
            return area * 1e8;
        case 'hectare':
            return area * 1e-6;
        case 'squareMile':
            return area * 3.861e-7;
        case 'squareYard':
            return area * 0.0001;
        case 'squareFoot':
            return area * 0.00107639;
        case 'squareInch':
            return area * 0.15500031;
        case 'acre':
            return area * 2.47105e-8;
        default:
            return 'Invalid to unit';
    }
}

function convertFromSquareMillimeter(area, toUnit) {
    switch (toUnit) {
        case 'squareMeter':
            return area * 1e-6;
        case 'squareKilometer':
            return area * 1e-12;
        case 'squareCentimeter':
            return area * 0.01;
        case 'squareMillimeter':
                return area;
        case 'squareMicrometer':
            return area * 1e6;
        case 'hectare':
            return area * 1e-8;
        case 'squareMile':
            return area * 3.861e-10;
        case 'squareYard':
            return area * 1.19599e-3;
        case 'squareFoot':
            return area * 0.0107639;
        case 'squareInch':
            return area * 1.550e-3;
        case 'acre':
            return area * 2.47105e-10;
        default:
            return 'Invalid to unit';
    }
}

function convertFromSquareMicrometer(area, toUnit) {
    switch (toUnit) {
        case 'squareMeter':
            return area * 1e-12;
        case 'squareKilometer':
            return area * 1e-18;
        case 'squareCentimeter':
            return area * 1e-8;
        case 'squareMillimeter':
            return area * 1e-6;
        case 'squareMicrometer':
            return area;
        case 'hectare':
            return area * 1e-16;
        case 'squareMile':
            return area * 3.861e-22;
        case 'squareYard':
            return area * 1.19599e-9;
        case 'squareFoot':
            return area * 1.07639e-8;
        case 'squareInch':
            return area * 1.550e-12;
        case 'acre':
            return area * 2.47105e-16;
        default:
            return 'Invalid to unit';
    }
}

function convertFromHectare(area, toUnit) {
    switch (toUnit) {
        case 'squareMeter':
            return area * 1e4;
        case 'squareKilometer':
            return area * 1e-4;
        case 'squareCentimeter':
            return area * 1e6;
        case 'squareMillimeter':
            return area * 1e8;
        case 'squareMicrometer':
            return area * 1e14;
        case 'hectare':
                return area;
        case 'squareMile':
            return area * 3.861e-6;
        case 'squareYard':
            return area * 11959.9;
        case 'squareFoot':
            return area * 107639.1;
        case 'squareInch':
            return area * 15500031;
        case 'acre':
            return area * 2.47105;
        default:
            return 'Invalid to unit';
    }
}

function convertFromSquareMile(area, toUnit) {
    switch (toUnit) {
        case 'squareMeter':
            return area * 2.59e6;
        case 'squareKilometer':
            return area * 2.59;
        case 'squareCentimeter':
            return area * 2.59e13;
        case 'squareMillimeter':
            return area * 2.59e15;
        case 'squareMicrometer':
            return area * 2.59e21;
        case 'hectare':
            return area * 259;
        case 'squareMile':
            return area;
        case 'squareYard':
            return area * 3.098e6;
        case 'squareFoot':
            return area * 2.788e7;
        case 'squareInch':
            return area * 4.014e9;
        case 'acre':
            return area * 640;
        default:
            return 'Invalid to unit';
    }
}

function convertFromSquareYard(area, toUnit) {
    switch (toUnit) {
        case 'squareMeter':
            return area * 0.836127;
        case 'squareKilometer':
            return area * 8.3613e-7;
        case 'squareCentimeter':
            return area * 8361.27;
        case 'squareMillimeter':
            return area * 836127;
        case 'squareMicrometer':
            return area * 8.36127e11;
        case 'hectare':
            return area * 8.3613e-5;
        case 'squareMile':
            return area * 3.2283e-7;
        case 'squareYard':
            return area;
        case 'squareFoot':
            return area * 9;
        case 'squareInch':
            return area * 1296;
        case 'acre':
            return area * 0.000206612;
        default:
            return 'Invalid to unit';
    }
}

function convertFromSquareFoot(area, toUnit) {
    switch (toUnit) {
        case 'squareMeter':
            return area * 0.092903;
        case 'squareKilometer':
            return area * 9.2903e-8;
        case 'squareCentimeter':
            return area * 929.03;
        case 'squareMillimeter':
            return area * 92903;
        case 'squareMicrometer':
            return area * 9.2903e10;
        case 'hectare':
            return area * 9.2903e-6;
        case 'squareMile':
            return area * 3.587e-8;
        case 'squareYard':
            return area * 0.111111;
        case 'squareFoot':
            return area;
        case 'squareInch':
            return area * 144;
        case 'acre':
            return area * 2.2957e-5;
        default:
            return 'Invalid to unit';
    }
}

function convertFromSquareInch(area, toUnit) {
    switch (toUnit) {
        case 'squareMeter':
            return area * 0.00064516;
        case 'squareKilometer':
            return area * 6.4516e-10;
        case 'squareCentimeter':
            return area * 6.4516;
        case 'squareMillimeter':
            return area * 645.16;
        case 'squareMicrometer':
            return area * 6.4516e8;
        case 'hectare':
            return area * 6.4516e-8;
        case 'squareMile':
            return area * 2.491e-10;
        case 'squareYard':
            return area * 0.000771605;
        case 'squareFoot':
            return area * 0.00694444;
        case 'squareInch':
            return area;
        case 'acre':
            return area * 1.5942e-7;
        default:
            return 'Invalid to unit';
    }
}

function convertFromAcre(area, toUnit) {
    switch (toUnit) {
        case 'squareMeter':
            return area * 4046.86;
        case 'squareKilometer':
            return area * 0.00404686;
        case 'squareCentimeter':
            return area * 4.04686e7;
        case 'squareMillimeter':
            return area * 4.04686e9;
        case 'squareMicrometer':
            return area * 4.04686e15;
        case 'hectare':
            return area * 0.404686;
        case 'squareMile':
            return area * 0.0015625;
        case 'squareYard':
            return area * 4840;
        case 'squareFoot':
            return area * 43560;
        case 'squareInch':
            return area * 6.273e6;
        case 'acre':
                return area;
        default:
            return 'Invalid to unit';
    }
}
