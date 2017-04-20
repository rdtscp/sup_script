<!DOCTYPE html>
<html>
<head>
	<title>Advanced ATC Settings</title>
	<style>
		h1 {text-align:center;}
		h2 {text-align:center;}
		h3 {text-align:center;}
		p {text-align:center;}
		label {
			display: inline-block;
			width:100px;
			text-align: right;
		}
		button {
			display: inline-block;
			text-align: right;
		}
		checkbox {
			display: inline-block;
			text-align: right;
		}
		.leftColumn {
			float: left;
			width: 400px;
			visibility: visible;
			text-align: center;
			display: inline-block;
			margin-right: 50px;
		}
		.rightColumn {
			float: left;
			width: 400px;
			visibility: visible;
			text-align: center;
			display: inline-block;
			margin-right: 50px
		}
		.container {
			width: 400px;
			clear: both;
		}
		.container input {
			width: 100%;
			clear: both;
		}
	</style>
</head>
<body style="font-family: Consolas;" onload="initPage()">
	<div style="text-align: center; margin: auto;">
		<h1> Introduction </h1>
		<p>
			The Advanced Supreme ATC extension must be configured through this webpage. <br>
			The two checkboxes below "Show User Data Form" and "Show Captcha Bypass" show/hide the corresponding sections for user input.<br>
			The extension works by having this webpage inject your options into the sourcecode of the extension in order to improve efficiency.
		</p>
		<h2><u>Usage</u></h2>
		<p>
			Before doing anything you need to set the filepath for your extension(i.e. tell this webpage where to find the files to inject details/settings into.). <br>
			First click "Update Extension Filepath" and supply the root directory of the Extension. It will look something like:<br><br>
			~/sup_script/Advanced Extension
			<br><br>
			In order for the Extension to autofill you're details/know your size preference, you must fill out the "User Data Form" and save the Details/Settings. <br/>
			To bypass captcha, Simply complete a captcha less than 2 minutes before the intended checkout time(i.e. drop) and click "Transfer Google Captcha Token". <br>
			If using paypal, you do not need to fill out the card number/expiry/cvv info. <br>
			Updating the User Data form will erase the Captcha bypass from the extension, so to have working captcha bypass, it must be the final setting you change.
		</p>
		<br/>
		<hr>
		<br/>
		<button type="button" onclick="updateFilepath()"> Update Extension Filepath </button>
		<br/>
		<?php
		if (!empty($_COOKIE["filepath"])) {
			echo 'Current filepath = ' . $_COOKIE["filepath"];
		}
		?>
		<br/>
	</div>
	<br/>

	<!-- Checkboxes to enable/disable certain functions. -->
	<div style="width: 900px; text-align: center; margin: auto;">
		<div class="leftColumn">
			<input id="hard_data_xbox" type="checkbox" value="0" onclick="enableUserData()" checked="false">Show User Data Form
		</div>
		<div class="rightColumn">
			<input id="bypass_recpatcha_xbox" type="checkbox" value="0" onchange="enableCaptchaBypass()" checked="false">Show Captcha Bypass
		</div>
	</div>
	<br/>

	<!-- Divs to hold forms for storing information. -->
	<div style="width: 900px; text-align: center; margin: auto;">
		<!-- Div for holding user data elements. -->
		<div id="hard_data_div" class="leftColumn" style="visibility: hidden">
			<form action='/savedata.php' method='post'>

				<input name="rqst_type" value="data" style="visibility: hidden;">

				<div class="container" style="display: inline-block; text-align: left;">

					<h2><b>billing/shipping information</b></h2>

					full name 	<input name="UKname" type="text"><br/>
					email		<input name="UKemail" type="email"><br/>
					tel 		<input name="UKtel" type="text"><br/>
					address 	<input name="UKaddr1" type="text"><br/>
					<input name="UKaddr2" type="text"><br/>
					<input name="UKaddr3" type="text"><br/>
					city 		<input name="UKcity" type="text"><br/>
					postcode	<input name="UKzip" type="text"><br/>
					country<br/> 	
					<select name="UKcountry"><br/>
						<option value="GB">UK</option>
						<option value="NB">UK (N. IRELAND)</option>
						<option value="">-</option>
						<option value="AT">AUSTRIA</option>
						<option value="BY">BELARUS</option>
						<option value="BE">BELGIUM</option>
						<option value="BG">BULGARIA</option>
						<option value="HR">CROATIA</option>
						<option value="CZ">CZECH REPUBLIC</option>
						<option value="DK">DENMARK</option>
						<option value="EE">ESTONIA</option>
						<option value="FI">FINLAND</option>
						<option value="FR">FRANCE</option>
						<option value="DE">GERMANY</option>
						<option value="GR">GREECE</option>
						<option value="HU">HUNGARY</option>
						<option value="IS">ICELAND</option>
						<option value="IE">IRELAND</option>
						<option value="IT">ITALY</option>
						<option value="LV">LATVIA</option>
						<option value="LT">LITHUANIA</option>
						<option value="LU">LUXEMBOURG</option>
						<option value="MC">MONACO</option>
						<option value="NL">NETHERLANDS</option>
						<option value="NO">NORWAY</option>
						<option value="PL">POLAND</option>
						<option value="PT">PORTUGAL</option>
						<option value="RO">ROMANIA</option>
						<option value="RU">RUSSIA</option>
						<option value="SK">SLOVAKIA</option>
						<option value="SI">SLOVENIA</option>
						<option value="ES">SPAIN</option>
						<option value="SE">SWEDEN</option>
						<option value="CH">SWITZERLAND</option>
						<option value="TR">TURKEY</option>
					</select><br/>
					
					<h2><b>credit card information</b></h2>
					
					type<br/>	
					<select name="UKcardtype">
						<option value="visa">visa</option><br/>
						<option value="american_express">American Express</option><br/>
						<option value="master">Mastercard</option><br/>
						<option value="solo">Solo</option><br/>
						<option value="paypal">Paypal</option><br/>
					</select><br/>
					number		<input name="UKcardnumb" type="text" pattern="[0-9]{13,16}"><br/>
					exp.date<br/>
					<select name="UKexpmonth">
						<option value="01">01</option><br/>
						<option value="02">02</option><br/>
						<option value="03">03</option><br/>
						<option value="04">04</option><br/>
						<option value="05">05</option><br/>
						<option value="06">06</option><br/>
						<option value="07">07</option><br/>
						<option value="08">08</option><br/>
						<option value="09">09</option><br/>
						<option value="10">10</option><br/>
						<option value="11">11</option><br/>
						<option value="12">12</option><br/>
					</select>
					<select name="UKexpyear">
						<option value="2017">2017</option><br/>
						<option value="2018">2018</option><br/>
						<option value="2019">2019</option><br/>
						<option value="2020">2020</option><br/>
						<option value="2021">2021</option><br/>
						<option value="2022">2022</option><br/>
						<option value="2023">2023</option><br/>
						<option value="2024">2024</option><br/>
						<option value="2025">2025</option><br/>
						<option value="2026">2026</option><br/>
						<option value="2027">2027</option><br/>
					</select><br/>
					cvv		<input name="UKcnv" type="text" maxlength="4" size="4"><br/>
					<br/>
					<h2><b>script settings</b></h2>
					size<br/>
					<select name="size">
						<option value="Small">Small</option><br/>
						<option value="Medium">Medium</option><br/>
						<option value="Large">Large</option><br/>
					</select>
					<br/>complete checkout<br/>
					<select name="complete_checkout">
						<option value="false">False</option><br/>
						<option value="true">True</option><br/>					
					</select>
					<input type='submit' value='Save Details/Settings'/>
				</div>
			</form>
			<!-- <div class="container" style="display: inline-block; text-align: left;">
				<form action='/savedata.php' method='post'>
					<input name="rqst_type" value="settings" style="visibility: hidden;">
					<input name="enabled" value="true" style="visibility: hidden;">
					<input type='submit' value='Enable Hard Coded Data'/>
				</form>
			</div>
			<div class="container" style="display: inline-block; text-align: left;">
				<form action='/savedata.php' method='post'>
					<input type='submit' value='Disable Hard Coded Data'/>
					<input name="rqst_type" value="settings" style="visibility: hidden;">
					<input name="enabled" value="false" style="visibility: hidden;">
				</form>
			</div> -->
			
		</div>

		<!-- Div for holding captcha bypass elements. -->
		<div id="captcha_bypass_div" class="rightColumn" style="visibility: hidden">
			<br/><br/>
			<form action='/savedata.php' method='post'>
				<br/>
				<div class="container" style="display: inline-block; text-align: left;">
					<div class='g-recaptcha' data-sitekey='6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz'></div>
					<script type='text/javascript' src='https://www.google.com/recaptcha/api.js'></script>
					<input type='submit' value='Transfer Google Captcha Token' name='submit' id='submit'/>
					<input name="rqst_type" value="bypass" style="visibility: hidden;">
					<input name="enabled" value="true" style="visibility: hidden;">
				</form>
		</div>
		<div class="container" style="display: inline-block; text-align: left;">
			<form action="/savedata.php" method="post">
				<input type='submit' value='Disable Recatpcha' />
				<input name="rqst_type" value="bypass" style="visibility: hidden;">
				<input name="enabled" value="false" style="visibility: hidden;">
				<input name="g-recaptcha-response" value="" style="visibility: hidden;">
			</form>
		</div>
		
	</div>
</div>


<script>
	function initPage() {
		document.getElementsByName("UKname")[0].value =  decodeURIComponent((getCook("UKname") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKemail")[0].value =  decodeURIComponent((getCook("UKemail") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKtel")[0].value =  decodeURIComponent((getCook("UKtel") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKaddr1")[0].value =  decodeURIComponent((getCook("UKaddr1") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKaddr2")[0].value =  decodeURIComponent((getCook("UKaddr2") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKaddr3")[0].value =  decodeURIComponent((getCook("UKaddr3") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKcity")[0].value =  decodeURIComponent((getCook("UKcity") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKzip")[0].value =  decodeURIComponent((getCook("UKzip") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKcountry")[0].value =  decodeURIComponent((getCook("UKcountry") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKcardtype")[0].value =  decodeURIComponent((getCook("UKcardtype") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKcardnumb")[0].value =  decodeURIComponent((getCook("UKcardnumb") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKexpmonth")[0].value =  decodeURIComponent((getCook("UKexpmonth") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKexpyear")[0].value =  decodeURIComponent((getCook("UKexpyear") + '').replace(/\+/g, '%20'));
		document.getElementsByName("UKcnv")[0].value =  decodeURIComponent((getCook("UKcnv") + '').replace(/\+/g, '%20'));
		document.getElementsByName("size")[0].value = decodeURIComponent((getCook("size")));
		console.log(getCook("size"));
		document.getElementById("hard_data_xbox").checked = false;
		document.getElementById("bypass_recpatcha_xbox").checked = false;
	}

	function updateFilepath() {
		var filepath = prompt("Enter filepath to root directory of extension");
		var payload  = filepath.replace(/\\/g,"/")
		document.cookie = "filepath=" + payload;
		location.reload();
	}

	function enableUserData() {
		var currVal = document.getElementById("hard_data_xbox").value;
		currVal++;
		if (currVal > 1) { currVal = 0; }
		document.getElementById("hard_data_xbox").value = currVal;
		if (currVal == 0) {
			document.getElementById("hard_data_div").style.visibility="hidden";
			document.getElementById("hard_data_xbox").checked = false;
		} else {
			document.getElementById("hard_data_xbox").checked = true;
			document.getElementById("hard_data_div").style.visibility="visible";
		}
	} 

	function enableCaptchaBypass() {
		var currVal = document.getElementById("bypass_recpatcha_xbox").value;
		currVal++;
		if (currVal > 1) { currVal = 0; }
		document.getElementById("bypass_recpatcha_xbox").value = currVal;
		if (currVal == 0) {
			document.getElementById("captcha_bypass_div").style.visibility="hidden";
			document.getElementById("bypass_recpatcha_xbox").checked = false;
		} else {
			document.getElementById("bypass_recpatcha_xbox").checked = true;
			document.getElementById("captcha_bypass_div").style.visibility="visible";
		}
	}

	function getCook(cookiename) {
	  	// Get name followed by anything except a semicolon
	  	var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
	  	// Return everything after the equal sign, or an empty string if the cookie name not found
	  	return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
	  }
	</script>

</body>
</html>