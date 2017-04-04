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
var token =  "foo";
var mode;
var man_token;

// Retrieves g-recaptcha token from file.
function getToken() {
	console.log("Get token");
	var xhr = new XMLHttpRequest();
	xhr.open('GET', chrome.extension.getURL('g-recaptcha-response.txt'), false);
	xhr.onreadystatechange = function()
	{
	    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
	    {
	        //... The content has been read in xhr.responseText
	        token = (xhr.responseText);
	    }
	};
	xhr.send();
	console.log("Obtained re-captcha token");
}

// Go to checkout page.
function goToCart() {
	window.open('https://www.supremenewyork.com/checkout', '_blank').focus();
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
	UKname 		=	item.order_billing_name;
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
	mode		=	item.mode;
	man_token	=	item.man_token;
	if (man_token == "true") {
		console.log("[OPT]: Using manual captcha token.");
		token =	item.recaptcha;	
	}
	console.log("    ✔ Obtained user details")
	if (!man_token) { getToken(); }

	var pathname 		= window.location.pathname;
	var pathname_first 	= pathname.substring(0,5);
	var pathname_second = pathname.substring(0,9);

	if (pathname != "/checkout" && pathname.length > 25) {	// If we are on product page.
		console.log("[STATUS]: On product page.")
		// Set size to Large
		var sizeList = document.getElementById("size");
		var currentSize = sizeList.options[sizeList.selectedIndex].textContent;
		var currentSizeId = sizeList.options[sizeList.selectedIndex].value;
		console.log("Attempting to set size");
		if (desiredSize == "Small") {
			if (currentSize == "Small") {
				console.log("Attempting to ADD-TO-CART");
				document.getElementsByTagName('input')[2].click();
				console.log("Clicked ADD-TO-CART");
			}	
		}
		else if (desiredSize == "Medium") {
			if (currentSize == "Small") {
				sizeList.value = parseInt(currentSizeId) + 1;
				console.log("    ✔ Size set to Medium");
			}
			var currentSize = sizeList.options[sizeList.selectedIndex].textContent;
			if (currentSize == "Medium") {
				console.log("Attempting to ADD-TO-CART");
				document.getElementsByTagName('input')[2].click();
				console.log("Clicked ADD-TO-CART");
			}	
		}
		else if (desiredSize == "Large") {
			if (currentSize == "Small") {
				sizeList.value = parseInt(currentSizeId) + 2;
				console.log("    ✔ Size set to Large");
			} else if (currentSize == "Medium") {
				sizeList.value = parseInt(currentSizeId) + 1;
				console.log("    ✔ Size set to Large");
			}
			var currentSize = sizeList.options[sizeList.selectedIndex].textContent;
			if (currentSize == "Large") {
				console.log("Attempting to ADD-TO-CART");
				document.getElementsByTagName('input')[2].click();
				console.log("Clicked ADD-TO-CART");
			}	
		}

		console.log("Checking to see if we have added to cart...")
		var check_added = setInterval( function() {
			//document.getElementsByTagName('input')[2].click();
			if (document.getElementById("cart-remove")) {
				console.log("    ✔  ADDED TO CART");
				console.log("Attempting to visit checkout page...");
				clearInterval(check_added);
				goToCart();
			}
		}, 250);	
	}
	else if (pathname == "/checkout") {
		console.log("[STATUS]: On checkout page");
		if (mode == 0 || mode == 1) {
			console.log("Attempting to remove google captcha.");
			document.getElementById("g-recaptcha-response").remove();
			console.log("    ✔ Google captcha removed.");
			console.log("Injecting google re-captcha response.");
			var response = document.createElement("input");
			response.setAttribute("type", "hidden");
			response.setAttribute("name", "g-recaptcha-response");
			response.setAttribute("value", token);
			document.getElementById("checkout_form").appendChild(response);
			console.log("    ✔ Injected google re-captcha response.");
		}
		console.log("Filling out details.");
		fillForm();
		if (mode == 0) {
			console.log("   ___ _  _ ___ ___ _  _____  _   _ _____   _  _  _____      __");
			console.log("  / __| || | __/ __| |/ / _ \\| | | |_   _| | \\| |/ _ \\ \\    / /");
			console.log(" | (__| __ | _| (__| ' < (_) | |_| | | |   | .` | (_) \\ \\/\\/ / ");
			console.log("  \\___|_||_|___\\___|_|\\_\\___/ \___/  |_|   |_|\\_|\\___/ \\_/\\_/");
		} else {
			console.log("----------------------------------------------");
			console.log("---Selected Mode only takes us to checkout.---");
			console.log("----------------------------------------------");
		}
	}
	else {
		console.log("[STATUS]: On page " + pathname);
		console.log("         ¬No work to do.");
	}

}



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





// If on checkout page
// var onInfoPage = setInterval( function() { // Continually fill details and try to checkout.
// 	console.log("Looking for checkout page");
// 	if (document.getElementById("checkout_form")) {
// 		fillForm();
// 		console.log("Filling form DONEEEEEEEEEE");
// 		//processPayment();
// 	}
// }, 350);

// Fill out form and replace captcha response.
function fillForm() {
	document.getElementById("order_billing_name").value = UKname; 
	document.getElementById("order_email").value = UKemail;
	document.getElementById("order_tel").value = UKtel;
	document.getElementById("bo").value = UKaddr1;
	document.getElementById("order_billing_city").value = UKcity;
	document.getElementById("order_billing_zip").value = UKpostcode; 
	document.getElementById("order_billing_country").value = UKcountry;
	console.log("    ✔ Filled out billing details");

	document.getElementById("credit_card_type").value = UKcardtype; 
	document.getElementById("cnb").value = UKcardnumb; 
	document.getElementById("vval").value = UKcnv;
	document.getElementById("credit_card_month").value = UKexpmonth;
	document.getElementById("credit_card_year").value = UKexpyear;
	console.log("    ✔ Filled out credit card details");

	document.getElementById("order_terms").checked = true;
	console.log("    ✔ Terms Accepted");
}

// Click "process payment"
function processPayment() {
	console.log("Processing payment");
	var processPayment = document.getElementById("checkout_form");
	var date 	= new Date();
	var seconds = date.getSeconds();
	// If we are buying on drop day.
	if (mode == 0) {
		// Dont checkout unless item released for more than 3 seconds.
		if (seconds > 3) {
			setInterval( function() {
				//processPayment.submit();
			}, 500);
		}
	// If we are in restock mode, checkout instantly.
	} else {
		console.log("Restock mode has been patched.")	
	}
}

// function checkout() {
// 	// Create form
// 	var form = document.createElement("form");
// 	form.id="checkout_form";
// 	form.setAttribute("class", "simple_form new_order");
// 	form.setAttribute("novalidate", "novalidate");
// 	form.setAttribute("action", "/checkout");
// 	form.setAttribute("accept-charset", "UTF-8");
// 	form.setAttribute("method", "post");

// 	// Hidden inputs.
// 	var charset = document.createElement("input");
// 	charset.setAttribute("name", "utf8");
// 	charset.setAttribute("value", "✓");
// 	charset.setAttribute("type", "hidden");
// 	form.appendChild(charset);

// 	var curr_auth_token = document.getElementsByName("csrf-token")[0].content;
// 	var auth_token = document.createElement("input");
// 	auth_token.setAttribute("name", "authenticity_token");
// 	auth_token.setAttribute("value", curr_auth_token);
// 	auth_token.setAttribute("type", "hidden");
// 	form.appendChild(auth_token);

// 	// Name + Address Details:
// 	var order_name = document.createElement("input");
// 	order_name.setAttribute("name", "order[billing_name]");
// 	order_name.setAttribute("value", UKname);
// 	form.appendChild(order_name);

// 	var order_email = document.createElement("input");
// 	order_email.setAttribute("name", "order[email");
// 	order_email.setAttribute("value", UKemail);
// 	form.appendChild(order_email);

// 	var order_tel = document.createElement("input");
// 	order_tel.setAttribute("name", "order[tel]");
// 	order_tel.setAttribute("value", UKtel);
// 	form.appendChild(order_tel);

// 	var order_addr1 = document.createElement("input");
// 	order_addr1.setAttribute("name", "order[billing_address]");
// 	order_addr1.setAttribute("value", UKaddr1);
// 	form.appendChild(order_addr1);
// 	var order_addr2 = document.createElement("input");
// 	order_addr2.setAttribute("name", "order[billing_address_2]");
// 	order_addr2.setAttribute("value", UKaddr2);
// 	form.appendChild(order_addr2);
// 	var order_addr3 = document.createElement("input");
// 	order_addr3.setAttribute("name", "order[billing_address_3]");
// 	order_addr3.setAttribute("value", UKaddr3);
// 	form.appendChild(order_addr3);

// 	var order_city = document.createElement("input");
// 	order_city.setAttribute("name", "order[billing_city]");
// 	order_city.setAttribute("value", UKcity);
// 	form.appendChild(order_city);

// 	var order_zip = document.createElement("input");
// 	order_zip.setAttribute("name", "order[billing_zip]");
// 	order_zip.setAttribute("value", UKpostcode);
// 	form.appendChild(order_zip);

// 	var order_country = document.createElement("input");
// 	order_country.setAttribute("name", "order[billing_country]");
// 	order_country.setAttribute("value", UKcountry);
// 	form.appendChild(order_country);

// 	// Extra flags.
// 	var same_as_billing_address = document.createElement("input");
// 	same_as_billing_address.setAttribute("name", "same_as_billing_address");
// 	same_as_billing_address.setAttribute("value", "1");
// 	form.appendChild(same_as_billing_address);
// 	var store_credit_id = document.createElement("input");
// 	store_credit_id.setAttribute("name", "store_credit_id");
// 	store_credit_id.setAttribute("value", "");
// 	form.appendChild(store_credit_id);

// 	// Credit Card info.
// 	var credit_card_type = document.createElement("input");
// 	credit_card_type.setAttribute("name", "credit_card[type]");
// 	credit_card_type.setAttribute("value", UKcardtype);
// 	form.appendChild(credit_card_type);

// 	var credit_card_numb = document.createElement("input");
// 	credit_card_numb.setAttribute("name", "credit_card[cnb]");
// 	credit_card_numb.setAttribute("value", UKcardnumb);
// 	form.appendChild(credit_card_numb);

// 	var cc_month = document.createElement("input");
// 	cc_month.setAttribute("name", "credit_card[month]");
// 	cc_month.setAttribute("value", UKexpmonth);
// 	form.appendChild(cc_month);

// 	var cc_year = document.createElement("input");
// 	cc_year.setAttribute("name", "credit_card[year]");
// 	cc_year.setAttribute("value", UKexpyear);
// 	form.appendChild(cc_year);

// 	var cc_vval = document.createElement("input");
// 	cc_vval.setAttribute("name", "credit_card[vval]");
// 	cc_vval.setAttribute("value", UKcnv);
// 	form.appendChild(cc_vval);

// 	// Misc order terms.
// 	var order_terms = document.createElement("input");
// 	order_terms.setAttribute("name", "order[terms]");
// 	order_terms.setAttribute("value", "0");
// 	order_terms.setAttribute("type", "hidden");
// 	form.appendChild(order_terms);

// 	var order_terms_div = document.createElement("div");
// 	order_terms_div.setAttribute("class", "icheckbox_minimal checked")
// 	order_terms_div.setAttribute("style", "position: relative;");
// 	form.appendChild(order_terms_div)

// 	var order_terms2 = document.createElement("input");
// 	order_terms2.id="order_terms";
// 	order_terms2.setAttribute("class", "checkbox");
// 	order_terms2.setAttribute("value", "1");
// 	order_terms2.setAttribute("checked", "checked");
// 	order_terms2.setAttribute("name", "order[terms]");
// 	order_terms2.setAttribute("style", "position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;");
// 	order_terms2.setAttribute("type", "checkbox");
// 	order_terms_div.appendChild(order_terms2);


// 	// google recaptcha response.
// 	var order_name = document.createElement("input");
// 	order_name.setAttribute("name", "g-recaptcha-response");
// 	order_name.setAttribute("value", token);
// 	form.appendChild(order_name);

// 	var order_name = document.createElement("input");
// 	order_name.setAttribute("name", "hpcvv");
// 	order_name.setAttribute("value", "");
// 	form.appendChild(order_name);

// 	// Add to page.
// 	document.body.appendChild(form);
// 	//form.submit();
// }