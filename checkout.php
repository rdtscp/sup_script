<!DOCTYPE html>
<html>
<head>
	<title>Pre Captcha Supreme</title>
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
<body style="font-family: Consolas" onload="initPage()">
	<div style="text-align: center; margin: auto;">
		<h1> Introduction </h1>
		<p>
			This software comes with two components. A firefox/chrome extension, and a webpage UI. The extension can be used <br />
			as standalone to automate most of the add-to-cart and checkout process on supreme's website, however with use of the <br />
			webpage UI, you can further the efficiency of the extension.
		</p>
		<h2><u>Modes</u></h2>
		<p>
			The three main ways the extension can be used are as follows: <br />
			- <b>Standalone</b>:<br />
			Standalone extension will only automate adding to cart, entering checkout page, and autofilling details. <br />
			Processing of payment MUST be done by user.<br /><br />

			- <b>Efficient User Data</b>:<br />
			If you want to completely bypass loading of user data through the extension, hosting the included <br />
			webpages(as detailed in the README), will allow you to 'hardcode' your auto-fill/size preferences <br />
			to speed up performance.<br /><br />

			- <b>Captcha Bypass</b>:<br />
			If you want to make use of the captcha bypassing, you must host the webpage and follow the appropriate<br />
			instructions. <b>Captcha Bypass</b> includes all features of <b>Standalone</b> by default.<br /><br />

			<b>The default settings only use <i>Standalone</i>. You must enable other features if you wish to use them.</b>

		</p>
		<br/>
		<hr>
		<br/>
		<button type="button" onclick="updateFilepath()"> Update Extension Filepath </button>
	</div>
	<br/>

	<!-- Checkboxes to enable/disable certain functions. -->
	<div style="width: 900px; text-align: center; margin: auto;">
		<div class="leftColumn">
			<input id="hard_data_xbox" type="checkbox" value="0" onchange="enableUserData()" checked="false">Enable User Data
		</div>
		<div class="rightColumn">
			<input id="bypass_recpatcha_xbox" type="checkbox" value="0" onchange="enableCaptchaBypass()" checked="false">Enable Captcha Bypass
		</div>
	</div>
	<br/>

	<!-- Divs to hold forms for storing information. -->
	<div style="width: 900px; text-align: center; margin: auto;">
		<!-- Div for holding user data elements. -->
		<div id="hard_data_div" class="leftColumn">
			<form action='/savedata.php' method='post'>

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
					<input type='submit' value='Save Details' name='save' id='save'/>
				</div>
			</form>
		</div>

		<!-- Div for holding captcha bypass elements. -->
		<div id="captcha_bypass_div" class="rightColumn">
			<form action='/checkout.php' method='post'>
				<br/>
				<div class="container" style="display: inline-block; text-align: left;">
					<div class='g-recaptcha' data-sitekey='6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz'></div>
					<script type='text/javascript' src='https://www.google.com/recaptcha/api.js'></script>

					<input type='submit' value='Transfer Google Captcha Token' name='submit' id='submit'/>
					<br></br>
					<?php
					$response = "";
					$filepath = "";
					if (!empty($_POST["g-recaptcha-response"])) {
						$response =  $_POST["g-recaptcha-response"];
					}
					if (!empty($_COOKIE["filepath"])) {
						$filepath =  $_COOKIE["filepath"] . "/g-recaptcha-response.txt";
						$file = fopen($filepath, "w");
						fwrite($file, $response);
						fclose($file);
					}
					echo '<textarea class="box">'. $response . '</textarea><br><br>';
					echo "Current filepath =" . $filepath ;
					echo '<script>
					document.cookie = "g-recaptcha-response=" + "' . $_POST["g-recaptcha-response"] . '";
				</script>
				'
				?>
			</div>
		</form>
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
			document.getElementById("hard_data_xbox").checked = false;
			document.getElementById("bypass_recpatcha_xbox").checked = false;
		}

		function updateFilepath() {
			var filepath = prompt("Enter filepath to root directory of extension");
			document.cookie = "filepath=" + filepath;
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