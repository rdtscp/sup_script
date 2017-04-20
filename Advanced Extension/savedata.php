<!DOCTYPE html>
<html>
<head>
<title>Save Settings</title>
</head>
<body>
<a href="/checkout.php">Return to settings.</a><br/>
<?php
	if (!isset($_COOKIE["filepath"])) {
		echo 'FILEPATH WAS NOT SET. SET THE FILEPATH AND START AGAIN';
	}
	else if (isset($_POST["rqst_type"]) && $_POST["rqst_type"] == "data") {

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
		if ($_POST["UKcardtype"] != "paypal") {								// Error checking
			setcookie("UKcardnumb", urldecode($_POST["UKcardnumb"]));
			setcookie("UKexpmonth", urldecode($_POST["UKexpmonth"]));
			setcookie("UKexpyear", urldecode($_POST["UKexpyear"]));
			setcookie("UKcnv", urldecode($_POST["UKcnv"]));
		}		
		setcookie("size", urldecode($_POST["size"]));

		// Init for injecting to source code.

		$filepath 		= $_COOKIE["filepath"];
		$source_path	= $filepath . "/source.txt";

		$file = fopen($source_path, "r+");
	    $source = utf8_encode(file_get_contents($source_path));

	    if ($_POST["UKcardtype"] == "paypal") {
	    	$payload = "var token = \"\";\nvar hardcoded = true;\nvar bypass_captcha = false;\nvar UKname = \"" . $_POST["UKname"] ."\"; \nvar UKemail = \"" . urldecode($_POST["UKemail"]) ."\";\nvar UKtel = \"" . urldecode($_POST["UKtel"]) ."\";\nvar UKaddr1 = \"" . urldecode($_POST["UKaddr1"]) ."\";\nvar UKaddr2 = \"" . urldecode($_POST["UKaddr2"]) ."\";\nvar UKaddr3 = \"" . urldecode($_POST["UKaddr3"]) ."\";\nvar UKcity = \"" . urldecode($_POST["UKcity"]) ."\";\nvar UKpostcode = \"" . urldecode($_POST["UKzip"]) ."\";\nvar UKcountry = \"" . urldecode($_POST["UKcountry"]) ."\";\nvar UKcardtype = \"" . urldecode($_POST["UKcardtype"]) ."\";\nvar UKcardnumb = \"" . urldecode($_POST["UKcardnumb"]) ."\";\nvar desiredSize = \"" . urldecode($_POST["size"]) . "\";\nvar complete_checkout = " . urldecode(($_POST["complete_checkout"])) . ";\n" . $source;
	    } else {
	    	$payload		= "var token = \"\";\nvar hardcoded = true;\nvar bypass_captcha = false;\nvar UKname = \"" . $_POST["UKname"] ."\"; \nvar UKemail = \"" . urldecode($_POST["UKemail"]) ."\";\nvar UKtel = \"" . urldecode($_POST["UKtel"]) ."\";\nvar UKaddr1 = \"" . urldecode($_POST["UKaddr1"]) ."\";\nvar UKaddr2 = \"" . urldecode($_POST["UKaddr2"]) ."\";\nvar UKaddr3 = \"" . urldecode($_POST["UKaddr3"]) ."\";\nvar UKcity = \"" . urldecode($_POST["UKcity"]) ."\";\nvar UKpostcode = \"" . urldecode($_POST["UKzip"]) ."\";\nvar UKcountry = \"" . urldecode($_POST["UKcountry"]) ."\";\nvar UKcardtype = \"" . urldecode($_POST["UKcardtype"]) ."\";\nvar UKcardnumb = \"" . urldecode($_POST["UKcardnumb"]) ."\";\nvar UKexpmonth = \"" . urldecode($_POST["UKexpmonth"]) . "\";\nvar UKexpyear = \"" . urldecode($_POST["UKexpyear"]) . "\";\nvar UKcnv = \"". urldecode($_POST["UKcnv"]) . "\";\nvar desiredSize = \"" . urldecode($_POST["size"]) . "\";\nvar complete_checkout = " . urldecode(($_POST["complete_checkout"])) . ";\n" . $source;
	    }		


		$dest_txt		= fopen($filepath . "/content.txt", "w");
		$dest_file		= fopen($filepath . "/content.js", "w");

		fwrite($dest_file, $payload);
		fwrite($dest_txt, $payload);
		fclose($dest_txt);
		fclose($dest_file);
		echo 'Details saved!';
	} /*else if (isset($_POST["rqst_type"]) && $_POST["rqst_type"] == "settings") {

		$filepath 		= $_COOKIE["filepath"];
		$source_path	= $filepath . "/content.txt";
		$dest_path		= $filepath . "/content.js";

		$source_file	= fopen($source_path, "r+");
		$dest_file		= fopen($dest_path, "w");

		$new_setting	= $_POST["enabled"];
		if ($new_setting == "true") { $old_setting	= "false"; }
		else if ($new_setting == "false") { $old_setting = "true"; }

	    $source 		= utf8_encode(file_get_contents($source_path));
	    $search 		= "var hardcoded = " . $old_setting . ";";
	    $replace 		= "var hardcoded = " . $new_setting .";";
		$payload		= str_replace($search, $replace, $source);

		fwrite($dest_file, $payload);
		fwrite($source_file, $payload);
		fclose($dest_file);
		fclose($source_file);

		echo 'Hardcoded Details = ' . $_POST["enabled"];
	}*/ else if (isset($_POST["rqst_type"]) && $_POST["rqst_type"] == "bypass") {

		$source 			= file_get_contents( $_COOKIE["filepath"] . "/content.txt");

		// Define vars to inject.
		$new_setting	= $_POST["enabled"];
		if ($new_setting == "true") { $old_setting	= "false"; }
		else if ($new_setting == "false") { $old_setting = "true"; }


		// Replace boolean variable to update if bypassing captcha.
		$search_bool		= "var bypass_captcha = " . $old_setting . ";";
		$replace_bool		= "var bypass_captcha = " . $new_setting . ";";


		$payload			= str_replace($search_bool, $replace_bool, $source);

		$source 			= null;
		$search_bool		= null;
		$search_val		 	= null;

		// Update variable storing captcha token.
		$search_val 		= current(explode(";", $payload));
		$replace_val        = 'var token = "' . $_POST["g-recaptcha-response"] . '"';
		$payload            = str_replace($search_val, $replace_val, $payload);


		$content_js		= fopen($_COOKIE["filepath"] . "/content.js" , "w");
		$content_txt	= fopen($_COOKIE["filepath"] . "/content.txt" , "w");
		fwrite($content_js, $payload);
		fwrite($content_txt, $payload);
		fclose($content_js);
		fclose($content_txt);
		$payload = null;
		echo 'Done';
	}
?>
</body>
</html>