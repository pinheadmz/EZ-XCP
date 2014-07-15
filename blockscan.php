<?
	$API = 'http://blockscan.com/api2.aspx?module=balance&address=';
	$addrs = $_POST['addrs'];
	$response = Array();
	foreach($addrs as $addr){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $API . $addr['address']);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$APIresult = curl_exec($ch);
		$APIresult = str_replace(array("\r", "\n"), "", $APIresult);
		array_push($response, $APIresult);
	}
	echo json_encode($response);
?>