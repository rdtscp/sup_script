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

<br></br><br></br>

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

		echo "Current filepath =" . $_COOKIE["filepath"] . "\g-recaptcha-response.txt";

		// Upon receiving recaptcha response, save it to file.
		$response = $_POST["g-recaptcha-response"];
		$filepath = $_COOKIE["filepath"] . "\g-recaptcha-response.txt";
		$file = fopen($filepath, "w");
		fwrite($file, $response);
		fclose($file);
	?>

</body>
</html>
