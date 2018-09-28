/*
 *
 *                 _ _             ___  __ 
 *  __ _ ____ __ _(_) |___ ___ _ _/ _ \/ / 
 * / _` / _\ V  V / | (_-</ _ \ " \_, / _ \
 * \__,_\__|\_/\_/|_|_/__/\___/_||_/_/\___/
 *                                        
 *
 */

let autofill = {
	UKname: 			null,
	UKemail: 			null,
	UKtel: 				null,
	UKaddr1: 			null,
	UKaddr2: 			null,
	UKaddr3: 			null,
	UKcity: 			null,
	UKpostcode: 	null,
	UKcountry: 		null,
	UKcardtype:		null,
	UKcardnumb:		null,
	UKcnv: 				null,
	UKexpmonth:		null,
	UKexpyear:		null,
	desiredSize:	null
};

// Go to checkout page.
const goToCart = () => {
	window.location.href="http://www.supremenewyork.com/checkout";
	console.log("    ✔ Opened checkout page");
	console.log("---------------------------------------------------------");
	console.log("---THIS CONSOLE MAY NOT SHOW ACTIVITY ON CHECKOUT PAGE---");
	console.log("---------------------------------------------------------");
	clearInterval(checkInCart);
	clearInterval(setSize);
};

// Fill out form and replace captcha response.
const fillCheckoutForm = () => {
	document.getElementById("order_billing_name").value				= UKname; 
	document.getElementById("order_email").value							= UKemail;
	document.getElementById("order_tel").value								= UKtel;
	document.getElementById("bo").value												= UKaddr1;
	document.getElementById("oba3").value											= UKaddr2;
	document.getElementById("order_billing_address_3").value 	= UKaddr3;
	document.getElementById("order_billing_city").value				= UKcity;
	document.getElementById("order_billing_zip").value				= UKpostcode; 
	document.getElementById("order_billing_country").value		= UKcountry;
	console.log("    ✔ Filled out billing details");

	document.getElementById("credit_card_type").value					= UKcardtype;
  console.log("    ✔ Selected payment type");
	if (UKcardtype != "paypal") {
		document.getElementById("cnb").value										= UKcardnumb;
		document.getElementById("vval").value										= UKcnv;
		document.getElementById("credit_card_month").value			= UKexpmonth;
		document.getElementById("credit_card_year").value				= UKexpyear;
		console.log("    ✔ Filled out credit card details");
	}

	document.getElementById("order_terms").checked = true;
	console.log("    ✔ Terms Accepted");
};


// Retrieves user data and starts script.
const onReceiveConfig = (config) => {
	console.log("Getting user details.");
	autofill.UKname				=	config.order_billing_name;
	console.log("    ✔ Name = " + config.order_billing_name);
	autofill.UKemail 			=	config.order_email;
	autofill.UKtel				=	config.order_tel;
	autofill.UKaddr1			=	config.bo;
	autofill.UKaddr2			=	config.oba3;
	autofill.UKaddr3			=	config.order_billing_address_3;
	autofill.UKcity				=	config.order_billing_city;
	autofill.UKpostcode		= config.order_billing_zip;
	autofill.UKcountry		= config.order_billing_country;
	autofill.UKcardtype		=	config.credit_card_type;
	autofill.UKcardnumb		= config.cnb;
	autofill.UKcnv				= config.vval;
	autofill.UKexpmonth		= config.credit_card_month;
	autofill.UKexpyear		= config.credit_card_year;
	autofill.desiredSize	= config.size;
	console.log("    ✔ Obtained user details");

	// If we are on a product page.
	if (pathname != "/checkout" && pathname.length > 25) {	// If we are on product page.
		console.log("[STATUS]: On product page.");
		console.log("Attemping to set size to " + desiredSize);
		const add_to_cart = setInterval(() => {
			// If we have the item in our cart.
			if (document.getElementById("cart-remove")) {
				console.log("    ✔  ADDED TO CART");
				console.log("Attempting to visit checkout page...");
				clearInterval(add_to_cart);
				goToCart();
			}

			// Set the Size & Add to Cart.
			let sizeList			= document.getElementById("size");
			let currentSize		= sizeList.options[sizeList.selectedIndex].textContent;
			let currentSizeId	= sizeList.options[sizeList.selectedIndex].value;
			console.log("Current Size = " + currentSize +". Desired Size = " + desiredSize);
			if (currentSize != desiredSize) {
				sizeList.value = parseInt(currentSizeId) + 1;
			}
			if (currentSize == desiredSize) {
				console.log("Attempting to ADD-TO-CART.");
				document.getElementsByTagName("input")[2].click();
				console.log("Clicked ADD-TO-CART");
			}
		}, 250);

	}
	else if (pathname == "/checkout") {
		console.log("[STATUS]: On checkout page");
		console.log("Filling out details.");
		fillCheckoutForm();
		console.log("   ___ _  _ ___ ___ _  _____  _   _ _____   _  _  _____      __");
		console.log("  / __| || | __/ __| |/ / _ \\| | | |_   _| | \\| |/ _ \\ \\    / /");
		console.log(" | (__| __ | _| (__| | < (_) | |_| | | |   | .` | (_) \\ \\/\\/ / ");
		console.log("  \\___|_||_|___\\___|_|\\_\\___/ \\___/  |_|   |_|\\_|\\___/ \\_/\\_/");
	}
	else {
		console.log("[STATUS]: On page " + pathname);
		console.log("         ¬No work to do.");
	}

};

// Checking to see if we are on a product page.
const check_page = setInterval(() => {
	if (document.getElementById("size")) {
		chrome.storage.local.get(["autofill"])
		.then(onReceiveConfig)
		.catch(err => console.error(err));

		clearInterval(check_page);
	}
}, 250);

/* Attempt to pull in autofill. */
chrome.storage.local.get(["autofill"])
.then(onReceiveConfig)
.catch(err => console.error(err));