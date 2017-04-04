<!DOCTYPE html>
<html>
<head>
	 <title>Pre Captcha Supreme</title>
</head>
<body>

<h1>Instructions</h1>
- Enter the filepath to the extension root in the textbox.
<br></br>
- Less than 2 minutes before the drop, visit this webpage, and complete a captcha.
<br></br>
- Copy the captcha response and paste it into the extension settings.

<br></br>
<a href="/checkout.php">Drag me to bookmark bar to save this page.
</a><br><br>

<button type="button" onclick="updateFilepath()"> Update Extension Filepath </button>
<script>
	function updateFilepath() {
		var filepath = prompt("Enter filepath to root directory of extension");
		document.cookie = "filepath=" + filepath;
	}
</script>

<br></br>

<form action='/checkout.php' method='post'>

	<div class='g-recaptcha' data-sitekey='6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz'></div>
	<script type='text/javascript' src='https://www.google.com/recaptcha/api.js'></script>



	<input type='submit' value='Transfer Google Captcha Token' name='submit' id='submit'/>


	<br></br>

	<?php

		$response = "";
		$filepath = "";

		// Upon receiving recaptcha response, save it to file.
		//$response = !empty($_POST["g-recaptcha-response"]) ? $_POST["g-recaptcha-response"] : '';
		//$filepath = !isset($_COOKIE["filepath"]) $_COOKIE["filepath"] . "\g-recaptcha-response.txt" : '';
		
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

		
	?>

</body>
</html>