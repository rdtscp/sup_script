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
var UKaddr3		=	'';
var UKcity 		=	'Atlantis'; 					// City name.
var UKpostcode 	= 	'AT12 3LA'; 				// City postcode.
var UKcountry 	= 	'GB'; 						// Leave this.
// Billing details.
var UKcardtype 	=	'visa'; 					// visa or american_express or master. // Not tested with american_express or master.
var UKcardnumb 	= 	'1324 5678 1234 5678'; 	// 16 Digit card number. ***Must be 16 digits, no spaces***
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

// If on checkout page
var onInfoPage = setInterval( function() { // Continually fill details and try to checkout.
	if (document.getElementById("checkout_form")) {
		processPayment();
	}
}, 250);

// Click "process payment"
function processPayment() {
	var processPayment = document.getElementById("checkout_form");
	var date 	= new Date();
	var seconds = date.getSeconds();
	// If we are buying on drop day.
	if (mode == 0) {
		// Dont checkout unless item released for more than 3 seconds.
		if (seconds > 3) {
			setInterval( function() {
				checkout();
			}, 500);
		}
	// If we are in restock mode, checkout instantly.
	} else {
		console.log("Restock mode has been patched.")	
	}
}

function checkout() {
	// Create form
	var form = document.createElement("form");
	form.id="checkout_form";
	form.setAttribute("class", "simple_form new_order");
	form.setAttribute("novalidate", "novalidate");
	form.setAttribute("action", "/checkout");
	form.setAttribute("accept-charset", "UTF-8");
	form.setAttribute("method", "post");

	// Hidden inputs.
	var charset = document.createElement("input");
	charset.setAttribute("name", "utf8");
	charset.setAttribute("value", "✓");
	charset.setAttribute("type", "hidden");
	form.appendChild(charset);

	var curr_auth_token = document.getElementsByName("csrf-token")[0].content;
	var auth_token = document.createElement("input");
	auth_token.setAttribute("name", "authenticity_token");
	auth_token.setAttribute("value", curr_auth_token);
	auth_token.setAttribute("type", "hidden");
	form.appendChild(auth_token);

	// Name + Address Details:
	var order_name = document.createElement("input");
	order_name.setAttribute("name", "order[billing_name]");
	order_name.setAttribute("value", UKname);
	form.appendChild(order_name);

	var order_email = document.createElement("input");
	order_email.setAttribute("name", "order[email");
	order_email.setAttribute("value", UKemail);
	form.appendChild(order_email);

	var order_tel = document.createElement("input");
	order_tel.setAttribute("name", "order[tel]");
	order_tel.setAttribute("value", UKtel);
	form.appendChild(order_tel);

	var order_addr1 = document.createElement("input");
	order_addr1.setAttribute("name", "order[billing_address]");
	order_addr1.setAttribute("value", UKaddr1);
	form.appendChild(order_addr1);
	var order_addr2 = document.createElement("input");
	order_addr2.setAttribute("name", "order[billing_address_2]");
	order_addr2.setAttribute("value", UKaddr2);
	form.appendChild(order_addr2);
	var order_addr3 = document.createElement("input");
	order_addr3.setAttribute("name", "order[billing_address_3]");
	order_addr3.setAttribute("value", UKaddr3);
	form.appendChild(order_addr3);

	var order_city = document.createElement("input");
	order_city.setAttribute("name", "order[billing_city]");
	order_city.setAttribute("value", UKcity);
	form.appendChild(order_city);

	var order_zip = document.createElement("input");
	order_zip.setAttribute("name", "order[billing_zip]");
	order_zip.setAttribute("value", UKpostcode);
	form.appendChild(order_zip);

	var order_country = document.createElement("input");
	order_country.setAttribute("name", "order[billing_country]");
	order_country.setAttribute("value", UKcountry);
	form.appendChild(order_country);

	// Extra flags.
	var same_as_billing_address = document.createElement("input");
	same_as_billing_address.setAttribute("name", "same_as_billing_address");
	same_as_billing_address.setAttribute("value", "1");
	form.appendChild(same_as_billing_address);
	var store_credit_id = document.createElement("input");
	store_credit_id.setAttribute("name", "store_credit_id");
	store_credit_id.setAttribute("value", "");
	form.appendChild(store_credit_id);

	// Credit Card info.
	var credit_card_type = document.createElement("input");
	credit_card_type.setAttribute("name", "credit_card[type]");
	credit_card_type.setAttribute("value", UKcardtype);
	form.appendChild(credit_card_type);

	var credit_card_numb = document.createElement("input");
	credit_card_numb.setAttribute("name", "credit_card[cnb]");
	credit_card_numb.setAttribute("value", UKcardnumb);
	form.appendChild(credit_card_numb);

	var cc_month = document.createElement("input");
	cc_month.setAttribute("name", "credit_card[month]");
	cc_month.setAttribute("value", UKexpmonth);
	form.appendChild(cc_month);

	var cc_year = document.createElement("input");
	cc_year.setAttribute("name", "credit_card[year]");
	cc_year.setAttribute("value", UKexpyear);
	form.appendChild(cc_year);

	var cc_vval = document.createElement("input");
	cc_vval.setAttribute("name", "credit_card[vval]");
	cc_vval.setAttribute("value", UKcnv);
	form.appendChild(cc_vval);

	// Misc order terms.
	var order_terms = document.createElement("input");
	order_terms.setAttribute("name", "order[terms]");
	order_terms.setAttribute("value", "0");
	order_terms.setAttribute("type", "hidden");
	form.appendChild(order_terms);

	var order_terms_div = document.createElement("div");
	order_terms_div.setAttribute("class", "icheckbox_minimal checked")
	order_terms_div.setAttribute("style", "position: relative;");
	form.appendChild(order_terms_div)

	var order_terms2 = document.createElement("input");
	order_terms2.id="order_terms";
	order_terms2.setAttribute("class", "checkbox");
	order_terms2.setAttribute("value", "1");
	order_terms2.setAttribute("checked", "checked");
	order_terms2.setAttribute("name", "order[terms]");
	order_terms2.setAttribute("style", "position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;");
	order_terms2.setAttribute("type", "checkbox");
	order_terms_div.appendChild(order_terms2);


	// google recaptcha response.
	var order_name = document.createElement("input");
	order_name.setAttribute("name", "g-recaptcha-response");
	order_name.setAttribute("value", token);
	form.appendChild(order_name);

	var order_name = document.createElement("input");
	order_name.setAttribute("name", "hpcvv");
	order_name.setAttribute("value", "");
	form.appendChild(order_name);

	// Add to page.
	document.body.appendChild(form);
	form.submit();
}