<?
	$DIR = 'users/';
	$f = fopen($DIR . $_POST['id'] . '.txt', 'w');
	fwrite($f, $_POST['mpk']);
	fclose($f);
	
	echo "Watch-only wallet stored on server!";

?>