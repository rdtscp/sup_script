/*
*
* アレックス
* 亚历克斯
* Alexander Wilson
* 
*
*
*	-- IMPORTANT --
*	If you are in US, fill out US data, then comment out "fillDetailsUK();" on line 89.
*	If you are in UK, fill out UK data, then comment out "fillDetailsUS();" on line 90.
*
*
*
*/

// Put your data here:

// UK
var UKname 		=	'Test Name';
var UKemail 	=	'test@email.com';
var UKtel 		=	'11 Digit Tel Number';
var UKaddr1		=	'Address Line 1';
var UKaddr2		=	'Address Line 2';
var UKcity 		=	'City Name';
var UKpostcode 	= 	'7 Character Postcode';
var UKcountry 	= 	'GB'; // Leave this
var UKcardtype 	=	'visa'; // visa or american_express or master
var UKcardnumb 	= 	'16 Digit Card #'; 
var UKcnv 		= 	'Last 3 Digits on Back';
var UKexpmonth 	= 	'01'; // Must be 2 digit format
var UKexpyear 	= 	'2017'; // Must be 4 digit format
// US
var USname 		=	'Test Name';
var USemail 	=	'test@email.com';
var UStel 		=	'10 Digit Tel Number';
var USaddr1		=	'Address Line 1';
var USaddr2		=	'Address Line 2';
var UScity 		=	'City Name';
var USstate 	= 	'2 Letter State Code' // I assume texas is TX
var USpostcode 	= 	'Zip Code';
var UScountry 	= 	'USA'; // Leave this
var UScardtype 	=	'visa'; // visa or american_express or master
var UScardnumb 	= 	'16 Digit Card #'; 
var UScnv 		= 	'Last 3 Digits on Back';
var USexpmonth 	= 	'01'; // Must be 2 digit format
var USexpyear 	= 	'2017'; // Must be 4 digit format




















// Find out if on product page by checking for element "size"
setInterval( function() {
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
		addToCart();
	}
}, 175);

// If on checkout page
if (document.getElementById("order_billing_name")) {
	/*
	    Comment out whichever you aren't in.
	*/
	fillDetailsUK();
	fillDetailsUS();
	// Leave this
	processPayment();
}

// If item in cart
if (document.getElementById("items-count").textContent != "") {
	goToCart();
}

// Click "add to basket"
function addToCart(){
	var addBasket = document.getElementById('cart-addf');
	addBasket.submit();
}

// Go to checkout page
function goToCart() {
	window.open('https://www.supremenewyork.com/checkout', '_blank').focus();
}

// Click "process payment"
function processPayment() {
	var processPayment = document.getElementById('checkout_form');
	var d;
	setInterval( function () {
		d = new Date();
		var secs = d.getSeconds();
		if (secs > 3) {
			processPayment.submit();	
		}
	}, 200)
}

// Fill details on UK page
function fillDetailsUK(){
	document.getElementById('order_billing_address_3').value = '';
	document.getElementById('order_billing_name').value =UK name; 
	document.getElementById('order_email').value = UKemail;
	document.getElementById('order_tel').value = UKtel;
	document.getElementById('bo').value = UKaddr1;
	document.getElementById('order_billing_city').value = UKcity;
	document.getElementById('order_billing_zip').value = UKpostcode; 
	document.getElementById('order_billing_country').value = UKcountry; 

	document.getElementById('credit_card_type').value = UKcardtype; 
	document.getElementById('cnb').value = UKcardnumb; 
	document.getElementById('vval').value = UKcnv;
	document.getElementById('credit_card_month').value = UKexpmonth;
	document.getElementById('credit_card_year').value = UKexpyear;

	document.getElementById('order_terms').checked = true;
}

// Fill details on US page
function fillDetailsUS(){
	document.getElementById('order_billing_name').value = USname;
	document.getElementById('order_email').value = USemail;
	document.getElementById('order_tel').value = UStel;
	document.getElementById('bo').value = USaddr1;
	document.getElementById('oba3').value = USaddr2;
	document.getElementById('order_billing_zip').value = USpostcode;
	document.getElementById('order_billing_city').value = UScity;
	document.getElementById('order_billing_state').value = USstate;
	document.getElementById('order_billing_country').value = UScountry;

	document.getElementById('credit_card_type').value = UScardtype; 
	document.getElementById('cnb').value = UScardnumb; 
	document.getElementById('vval').value = UScnv;
	document.getElementById('credit_card_month').value = USexpmonth;
	document.getElementById('credit_card_year').value = USexpyear;

	document.getElementById('order_terms').checked = true;
}