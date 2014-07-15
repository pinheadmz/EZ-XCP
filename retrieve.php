<?
	$DIR = 'users/';
	echo file_get_contents($DIR . $_POST['id'] . '.txt');
?>