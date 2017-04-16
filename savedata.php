<!DOCTYPE html>
<html>
<head>
</head>
<body>
Details saved! <br/>
<a href="/checkout.php">Return to settings.<br/>
<?php

	// Save billing info to cookie.
	setcookie("UKname", urldecode($_POST["UKname"]));
	setcookie("UKemail", urldecode($_POST["UKemail"]));
	setcookie("UKtel", urldecode($_POST["UKtel"]));
	setcookie("UKaddr1", urldecode($_POST["UKaddr1"]));
	setcookie("UKaddr2", urldecode($_POST["UKaddr2"]));
	setcookie("UKaddr3", urldecode($_POST["UKaddr3"]));
	setcookie("UKcity", urldecode($_POST["UKcity"]));
	setcookie("UKzip", urldecode($_POST["UKzip"]));
	setcookie("UKcountry", urldecode($_POST["UKcountry"]));

	// Save card details to cookie.
	setcookie("UKcardtype", urldecode($_POST["UKcardtype"]));
	setcookie("UKcardnumb", urldecode($_POST["UKcardnumb"]));
	setcookie("UKexpmonth", urldecode($_POST["UKexpmonth"]));
	setcookie("UKexpyear", urldecode($_POST["UKexpyear"]));
	setcookie("UKcnv", urldecode($_POST["UKcnv"]));

	// Init for injecting to source code.

	$filepath 		= $_COOKIE["filepath"];
	$source_path	= $filepath . "/source.txt";

	$file = fopen($source_path, "r+");
    $source = utf8_encode(file_get_contents($source_path));
	$payload		= "var hardcoded = true;\nvar UKname = \"" . $_POST["UKname"] ."\"; \nvar UKemail = \"" . urldecode($_POST["UKemail"]) ."\";\nvar UKtel = \"" . urldecode($_POST["UKtel"]) ."\";\nvar UKaddr1 = \"" . urldecode($_POST["UKaddr1"]) ."\";\nvar UKaddr2 = \"" . urldecode($_POST["UKaddr2"]) ."\";\nvar UKaddr3 = \"" . urldecode($_POST["UKaddr3"]) ."\";\nvar UKcity = \"" . urldecode($_POST["UKcity"]) ."\";\nvar UKzip = \"" . urldecode($_POST["UKzip"]) ."\";\nvar UKcountry = \"" . urldecode($_POST["UKcountry"]) ."\";\nvar UKcardtype = \"" . urldecode($_POST["UKcardtype"]) ."\";\nvar UKcardnumb = \"" . urldecode($_POST["UKcardnumb"]) ."\";\nvar UKexpmonth = \"" . urldecode($_POST["UKexpmonth"]) . "\";\nvar UKexpyear = \"" . urldecode($_POST["UKexpyear"]) . "\";\nvar UKcnv = \"". urldecode($_POST["UKcnv"]) . "\";\n" . $source;


	$dest_file		= fopen($filepath . "/content.js", "w");
	fwrite($dest_file, $payload);
	fclose($dest_file);


?>
</body>
</html>