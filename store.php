<?php
	$DIR = 'users/';
	$ID = $_POST['id'];
	$FILENAME = $DIR . $_POST['id'] . '.txt';
	$MPK = $_POST['mpk'];

	// blank fields
	if (!$ID || !$MPK){
		echo "Error: Identifier can not be empty";
		exit();
	}
	
	// 16-character filenames only	
	if(strlen($ID) > 16){
		echo "Error: Identifier must be 16 characters or less";
		exit();
	}
	
	// alphanumeric filenames only	
	if(preg_match('/[^a-z0-9]/i', $ID)){
		echo "Error: Identifier must be alpha-numeric only";
		exit();
	}
	
	// duplicate username error
	if (file_exists($FILENAME)){
		echo "Error: This identifier is alrteady in use!\nPlease choose antoher";
		exit();
	}
	
	// master public key, even when encrypted, shouldn't be more than 200 characters
	if(strlen($MPK) > 200){
		echo "Error: Master public key is too long";
		exit();
	}

	$f = fopen($FILENAME, 'w');
	$g = fwrite($f, $MPK);
	$h = fclose($f);
	
	if(!$f || !$g || !$h){
		echo "Error: Server Error";
		exit();
	} else {
		echo "Success: Watch-only wallet stored on server";
	}

?>