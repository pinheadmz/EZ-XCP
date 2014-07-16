<?
	$DIR = 'users/';
	$f = file_get_contents($DIR . $_POST['id'] . '.txt');
	if ($f)
		echo $f;
	else
		echo 'false';
?>