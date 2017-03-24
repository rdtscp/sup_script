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


/*
   _____             __ _                        ____       _                
  / ____|           / _(_)                      |  _ \     | |               
 | |     ___  _ __ | |_ _  __ _ _   _ _ __ ___  | |_) | ___| | _____      __ 
 | |    / _ \| '_ \|  _| |/ _` | | | | '__/ _ \ |  _ < / _ \ |/ _ \ \ /\ / / 
 | |___| (_) | | | | | | | (_| | |_| | | |  __/ | |_) |  __/ | (_) \ V  V /  
  \_____\___/|_| |_|_| |_|\__, |\__,_|_|  \___| |____/ \___|_|\___/ \_/\_/   
                           __/ |                                             
                          |___/
*/

/*  ---INSTRUCTIONS---
 * Enter your data as per the examples.
 * All fields are compulsary except UKaddr2, this can be left as
 * an emptry string if not needed.
 *
 * Set desiredSize as one of these.
 *  Small
 *  Medium
 *  Large
 *  X-Large - NOT SUPPORTED YET   
 *
 * Set mode here:
 *   0 = Drop day, enable this if you want to succesfully cart after a drop.
 *   1 = Restock mode. _-*WARNING*-_ This setting does not work anymore.
 */


// Put your data here:
// Personal details.
var UKname 		=	'John Smith'; 			// First name and last name.
var UKemail 	=	'jsmith@email.com'; 			// Email address.
var UKtel 		=	'01234567890'; 			// UK Phone number
var UKaddr1		=	'1 Makebelieve Street'; 			// UK street number and address.
var UKaddr2		=	''; 						// Possible second line of address.
var UKcity 		=	'Atlantis'; 					// City name.
var UKpostcode 	= 	'AT12 3LA'; 				// City postcode.
var UKcountry 	= 	'GB'; 						// Leave this.
// Billing details.
var UKcardtype 	=	'visa'; 					// visa or american_express or master. // Not tested with american_express or master.
var UKcardnumb 	= 	'1324567812345678'; 	// 16 Digit card number. ***Must be 16 digits, no spaces***
var UKcnv 		= 	'123';				// 3 Digit CVV. ***Must be 3 digits***
var UKexpmonth 	= 	'12'; 						// Expiry month. ***Must be 2 digit format***
var UKexpyear 	= 	'2019'; 					// Expiry year. ***Must be 4 digit format***
// Script details.
var desiredSize = "Large"; 						// SET YOUR SIZE HERE - Refer to INSTRUCTIONS above.
var mode = "0";									// SET YOUR MODE HERE - Refer to INSTRUCTIONS above.


/*
   _____             __ _                                 _                    
  / ____|           / _(_)                          /\   | |                   
 | |     ___  _ __ | |_ _  __ _ _   _ _ __ ___     /  \  | |__   _____   _____ 
 | |    / _ \| '_ \|  _| |/ _` | | | | '__/ _ \   / /\ \ | '_ \ / _ \ \ / / _ \
 | |___| (_) | | | | | | | (_| | |_| | | |  __/  / ____ \| |_) | (_) \ V /  __/
  \_____\___/|_| |_|_| |_|\__, |\__,_|_|  \___| /_/    \_\_.__/ \___/ \_/ \___|
                           __/ |                                               
                          |___/                                                
*/

// -------------------------------------------------------------------------- \\
// -------------------------------------------------------------------------- \\
// -------------------------------------------------------------------------- \\
// -------------------------------------------------------------------------- \\
// -------------------------------------------------------------------------- \\
/*


  ___          _        _                         _         _            
 |   \ ___ _ _| |_   __| |_  __ _ _ _  __ _ ___  | |__  ___| |_____ __ __
 | |) / _ \ ' \  _| / _| ' \/ _` | ' \/ _` / -_) | '_ \/ -_) / _ \ V  V /
 |___/\___/_||_\__| \__|_||_\__,_|_||_\__, \___| |_.__/\___|_\___/\_/\_/ 
                                      |___/                              
*/

// Gets the captcha response token as a string.
var token;
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


// Find out if on product page by checking for element "size"
var setSize = setInterval( function() {
	if (document.getElementById("size")) {
		// Set size to Large
		var sizeList = document.getElementById("size");
		var currentSize = sizeList.options[sizeList.selectedIndex].textContent;
		var currentSizeId = sizeList.options[sizeList.selectedIndex].value;
		if (desiredSize == "Small") {
			if (currentSize == "Small") {
				document.getElementsByTagName('input')[2].click();
			}	
		}
		else if (desiredSize == "Medium") {
			if (currentSize == "Small") {
				sizeList.value = parseInt(currentSizeId) + 1;
			}
			if (currentSize == "Medium") {
				document.getElementsByTagName('input')[2].click();
			}	
		}
		else if (desiredSize == "Large") {
			if (currentSize == "Small") {
				sizeList.value = parseInt(currentSizeId) + 2;
			} else if (currentSize == "Medium") {
				sizeList.value = parseInt(currentSizeId) + 1;
			}
			if (currentSize == "Large") {
				document.getElementsByTagName('input')[2].click();
			}	
		}
	}
	else if (mode == 1) { window.location.reload(); }
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

var sentPOST = false;


// If on checkout page
var onInfoPage = setInterval( function() { // Continually fill details and try to checkout.
	if (document.getElementById("checkout_form")) {
		fillDetailsUK();
		if (!sentPOST) {
			processPayment();
		}
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
	var date 	= new Date();
	var seconds = date.getSeconds();
	// If we are buying on drop day.
	if (mode == 0) {
		// Dont checkout unless item released for more than 3 seconds.
		sendHttpPostCheckout();
		sentPOST = true;
	// If we are in restock mode, checkout instantly.
	}else {
		console.log("Restock mode has been patched.")	
	}
}

function sendHttpPostCheckout() {
	console.log("Pretend we have sent it with captcha response = " + token);
}