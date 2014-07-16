<?php
	$DIR = 'users/';
	$ID = $_POST['id'];
	$FILENAME = $DIR . $_POST['id'] . '.txt';
	
	$f = file_get_contents($FILENAME);
	if ($f)
		echo $f;
	else
		echo 'false';
?>