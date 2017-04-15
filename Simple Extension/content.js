/*
*
* アレックス
* 亚历克斯
* Alexander Wilson
*                 _ _             ___  __ 
*  __ _ ____ __ _(_) |___ ___ _ _/ _ \/ / 
* / _` / _\ V  V / | (_-</ _ \ ' \_, / _ \
* \__,_\__|\_/\_/|_|_/__/\___/_||_/_/\___/
*                                        
*
*/
var UKname;
var UKemail;
var UKtel;
var UKaddr1;
var UKaddr2;
var UKaddr3;
var UKcity;
var UKpostcode;
var UKcountry;
var UKcardtype;
var UKcardnumb;
var UKcnv;
var UKexpmonth;
var UKexpyear;
var desiredSize;

// Go to checkout page.
function goToCart() {
    window.location.href="http://www.supremenewyork.com/checkout"
	console.log("    ✔ Opened checkout page");
	console.log("---------------------------------------------------------");
	console.log("---THIS CONSOLE MAY NOT SHOW ACTIVITY ON CHECKOUT PAGE---");
	console.log("---------------------------------------------------------");
	clearInterval(checkInCart);
	clearInterval(setSize);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

// Retrieves user data and starts script.
function onGot(item) {
	console.log("Getting user details.")
	UKname 		=	item.order_billing_name;
	console.log("    ✔ Name = " + item.order_billing_name);
	UKemail 	=	item.order_email;
	UKtel 		=	item.order_tel;
	UKaddr1		=	item.bo;
	UKaddr2		=	item.oba3;
	UKaddr3		=	item.order_billing_address_3;
	UKcity 		=	item.order_billing_city;
	UKpostcode 	= 	item.order_billing_zip;
	UKcountry 	= 	item.order_billing_country;
	UKcardtype 	=	item.credit_card_type;
	UKcardnumb 	= 	item.cnb;
	UKcnv 		= 	item.vval;
	UKexpmonth 	= 	item.credit_card_month;
	UKexpyear 	= 	item.credit_card_year;
	desiredSize = 	item.size;
	console.log("    ✔ Obtained user details")

	var pathname 		= window.location.pathname;
	var pathname_first 	= pathname.substring(0,5);
	var pathname_second = pathname.substring(0,9);

	if (pathname != "/checkout" && pathname.length > 25) {	// If we are on product page.
		console.log("[STATUS]: On product page.")
		console.log("Attemping to set size to " + desiredSize);
		var add_to_cart = setInterval( function() {
			if (document.getElementById("cart-remove")) {
				console.log("    ✔  ADDED TO CART");
				console.log("Attempting to visit checkout page...");
				clearInterval(add_to_cart);
				goToCart();
			}
			var sizeList = document.getElementById("size");
			var currentSize = sizeList.options[sizeList.selectedIndex].textContent;
			var currentSizeId = sizeList.options[sizeList.selectedIndex].value;
			console.log("Current Size = " + currentSize +". Desired Size = " + desiredSize);
			if (currentSize != desiredSize) {
				sizeList.value = parseInt(currentSizeId) + 1;
			}
			if (currentSize == desiredSize) {
				console.log("Attempting to ADD-TO-CART.")
				document.getElementsByTagName('input')[2].click();
				console.log("Clicked ADD-TO-CART");
			}
		}, 750);

	}
	else if (pathname == "/checkout") {
		console.log("[STATUS]: On checkout page");
		console.log("Filling out details.");
		fillForm();
		console.log("   ___ _  _ ___ ___ _  _____  _   _ _____   _  _  _____      __");
		console.log("  / __| || | __/ __| |/ / _ \\| | | |_   _| | \\| |/ _ \\ \\    / /");
		console.log(" | (__| __ | _| (__| ' < (_) | |_| | | |   | .` | (_) \\ \\/\\/ / ");
		console.log("  \\___|_||_|___\\___|_|\\_\\___/ \\___/  |_|   |_|\\_|\\___/ \\_/\\_/");
	}
	else {
		console.log("[STATUS]: On page " + pathname);
		console.log("         ¬No work to do.");
	}

}

console.log("test");

var getting = browser.storage.local.get(
	[
	"order_billing_name",
	"order_email",
	"order_tel",
	"bo",
	"oba3",
	"order_billing_address_3",
	"order_billing_city",
	"order_billing_zip",
	"order_billing_country",
	"credit_card_type",
	"cnb",
	"credit_card_month",
	"credit_card_year",
	"vval",
	"size",
	"mode",
	"man_token"
	]
);
getting.then(onGot, onError);


var check_page = setInterval( function(){
	if (document.getElementById("size")) {
		getting.then(onGot, onError);
		clearInterval(check_page);
	}
}, 250);


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
	console.log("    ✔ Filled out billing details");

    document.getElementById("credit_card_type").value = UKcardtype;
    console.log("    ✔ Selected payment type");
	if (UKcardtype != "paypal") {
        document.getElementById("cnb").value = UKcardnumb;
        document.getElementById("vval").value = UKcnv;
        document.getElementById("credit_card_month").value = UKexpmonth;
        document.getElementById("credit_card_year").value = UKexpyear;
        console.log("    ✔ Filled out credit card details");
	}

	document.getElementById("order_terms").checked = true;
	console.log("    ✔ Terms Accepted");
}
