/*
*
* アレックス
* 亚历克斯
* Alexander Wilson
*
*/

// Put your data here:
var UKname 		=	'first last name';
var UKemail 	=	'email@gmail.com';
var UKtel 		=	'phone number';
var UKaddr1		=	'street address';
var UKaddr2		=	'';
var UKcity 		=	'city';
var UKpostcode 	= 	'postcode';
var UKcountry 	= 	'GB'; // Leave this
var UKcardtype 	=	'visa'; // visa or american_express or master
var UKcardnumb 	= 	'16 digit card number'; 
var UKcnv 		= 	'3 digit cvv';
var UKexpmonth 	= 	'06'; // Must be 2 digit format
var UKexpyear 	= 	'2019'; // Must be 4 digit format

// Find out if on product page by checking for element "size"
var setSize = setInterval( function() {
	if (document.getElementById("size")) {
		// Set size to Large
		var sizeList = document.getElementById("size");
		var currentSize = sizeList.options[sizeList.selectedIndex].textContent;
		var currentSizeId = sizeList.options[sizeList.selectedIndex].value;
		if (currentSize == "Small") {
			sizeList.value = parseInt(currentSizeId) + 2;
		} else if (currentSize == "Medium") {
			sizeList.value = parseInt(currentSizeId) + 1;
		}
		if (currentSize == "Large") {
			document.getElementsByTagName('input')[2].click();
		}
	}
}, 250);

// See if item is in cart.
var checkInCart = setInterval( function() {
	if (document.getElementById("cart-remove")) {
		goToCart();
	}
}, 250);

// Go to checkout page.
function goToCart() {
	window.open('https://www.supremenewyork.com/checkout', '_blank').focus();
	clearInterval(checkInCart);
	clearInterval(setSize);
}


// If on checkout page
var onInfoPage = setInterval( function() {
	if (document.getElementById("checkout_form")) {
		fillDetailsUK();
		processPayment();
	}
}, 250);


// // Fill details on UK page
function fillDetailsUK(){
	document.getElementById("order_billing_name").value = UKname; 
	document.getElementById("order_email").value = UKemail;
	document.getElementById("order_tel").value = UKtel;
	document.getElementById("bo").value = UKaddr1;
	document.getElementById("order_billing_city").value = UKcity;
	document.getElementById("order_billing_zip").value = UKpostcode; 
	document.getElementById("order_billing_country").value = UKcountry; 

	document.getElementById("credit_card_type").value = UKcardtype; 
	document.getElementById("cnb").value = UKcardnumb; 
	document.getElementById("vval").value = UKcnv;
	document.getElementById("credit_card_month").value = UKexpmonth;
	document.getElementById("credit_card_year").value = UKexpyear;

	document.getElementById("order_terms").checked = true;
}

// Click "process payment"
function processPayment() {
	var processPayment = document.getElementById("checkout_form");
	setInterval( function () {
		processPayment.submit();

	}, 250)
}
