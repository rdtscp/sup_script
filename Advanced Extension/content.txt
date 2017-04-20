var token = "";
var hardcoded = true;
var bypass_captcha = false;
var UKname = "Full Name"; 
var UKemail = "email@email.com";
var UKtel = "07777777777";
var UKaddr1 = "Flat 1";
var UKaddr2 = "Block 1";
var UKaddr3 = "Street";
var UKcity = "City";
var UKpostcode = "POST CDE";
var UKcountry = "GB";
var UKcardtype = "paypal";
var UKcardnumb = "";
var desiredSize = "Large";
var complete_checkout = false;
// Go to checkout page.
function goToCart() {
	//window.open('https://www.supremenewyork.com/checkout', '_blank').focus();
	window.location.pathname = "/checkout";
	console.log("    + Opened checkout page");
	console.log("---------------------------------------------------------");
	console.log("---THIS CONSOLE MAY NOT SHOW ACTIVITY ON CHECKOUT PAGE---");
	console.log("---------------------------------------------------------");
}

// Fill out form and replace captcha response.
function fillForm() {
	document.getElementById("order_billing_name").value = UKname; 
	document.getElementById("order_email").value = UKemail;
	document.getElementById("order_tel").value = UKtel;
	document.getElementById("bo").value = UKaddr1;
	document.getElementById("oba3").value = UKaddr2;
	document.getElementById("order_billing_address_3").value = UKaddr3;
	document.getElementById("order_billing_city").value = UKcity;
	document.getElementById("order_billing_zip").value = UKpostcode;
	document.getElementById("order_billing_country").value = UKcountry;
	console.log("    + Filled out billing details");

	document.getElementById("credit_card_type").value = UKcardtype;
	if (UKcardtype != "paypal") {
		document.getElementById("cnb").value = UKcardnumb; 
		document.getElementById("vval").value = UKcnv;
		document.getElementById("credit_card_month").value = UKexpmonth;
		document.getElementById("credit_card_year").value = UKexpyear;
	}
	console.log("    + Filled out payment details");

	document.getElementById("order_terms").checked = true;
	console.log("    + Terms Accepted");
}

// Click "process payment"
function processPayment() {
	console.log("Processing payment");
	var processPayment = document.getElementById("checkout_form");
	// Dont checkout unless item released for more than 3 seconds.
	var checkout_interval = setInterval( function() {
		var date 	= new Date();
		var seconds = date.getSeconds();
		console.log("Waiting to skip ghost orders.")
		if (seconds > 3) {
			clearInterval(checkout_interval)
			processPayment.submit();
		}
	}, 500);
}

var pathname 		= window.location.pathname;
var pathname_first 	= pathname.substring(0,5);
var pathname_second = pathname.substring(0,9);

var check_page = setInterval( function() {
	var pathname_latest = window.location.pathname;
	if (pathname_latest != pathname) {
		pathname = window.location.pathname;
		script();
	}
	if (pathname == "/checkout") {
		clearInterval(check_page);
		script();
	}
}, 250);


function script() {
	if (pathname != "/checkout" && pathname.length > 25) {	// If we are on product page.
		console.log("[STATUS]: On product page.");
		console.log("Attemping to set size to " + desiredSize);
		var add_to_cart = setInterval( function() {
			if (document.getElementById("cart-remove")) {
				console.log("    +  ADDED TO CART");
				console.log("Attempting to visit checkout page...");
				clearInterval(add_to_cart);
				clearInterval(check_page);
				goToCart();
			}
			var sizeList = document.getElementById("size");
			var currentSize = sizeList.options[sizeList.selectedIndex].textContent;
			var currentSizeId = sizeList.options[sizeList.selectedIndex].value;
			console.log("Current Size = " + currentSize);
			if (currentSize != desiredSize) {
				sizeList.value = parseInt(currentSizeId) + 1;
			}
			if (currentSize == desiredSize) {
				console.log("Attempting to ADD-TO-CART.")
				document.getElementsByTagName('input')[2].click();
				console.log("Clicked ADD-TO-CART");
			}
		}, 250);
	}
	else if (pathname == "/checkout") {
		console.log("[STATUS]: On checkout page");
		if (bypass_captcha) {
			console.log("Attempting to remove google captcha.");
			document.getElementById("g-recaptcha-response").remove();
			console.log("    + Google captcha removed.");
			console.log("Injecting google re-captcha response.");
			var response = document.createElement("input");
			response.setAttribute("type", "hidden");
			response.setAttribute("name", "g-recaptcha-response");
			response.setAttribute("value", token);
			document.getElementById("checkout_form").appendChild(response);
			console.log("    + Injected google re-captcha response.");
		}
		console.log("Filling out details.");
		fillForm();
		if (complete_checkout) {
			processPayment();
			console.log("   ___ _  _ ___ ___ _  _____  _   _ _____   _  _  _____      __");
			console.log("  / __| || | __/ __| |/ / _ \\| | | |_   _| | \\| |/ _ \\ \\    / /");
			console.log(" | (__| __ | _| (__| ' < (_) | |_| | | |   | .` | (_) \\ \\/\\/ / ");
			console.log("  \\___|_||_|___\\___|_|\\_\\___/ \\___/  |_|   |_|\\_|\\___/ \\_/\\_/");
		} else {
			console.log("----------------------------------------------");
			console.log("---Selected Mode only takes us to checkout.---");
			console.log("----------------------------------------------");
		}
	}
	else {
		console.log("[STATUS]: On page " + pathname);
		console.log("         +No work to do.");
	}
}