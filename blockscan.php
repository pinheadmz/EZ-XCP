<?php
	// let's get bitcoin balance from blockchain.info first
	$BTCAPI = 'https://blockchain.info/q/addressbalance/';
	$API = 'http://blockscan.com/api2.aspx?module=balance&address=';
	$addrs = $_POST['addrs'];
	$response = Array();
	foreach($addrs as $addr){
		// blockchain (BTC)
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $BTCAPI . $addr['address']);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$BTCAPIresult = curl_exec($ch);
				
		// blockscan
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $API . $addr['address']);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$APIresult = curl_exec($ch);
		$APIresult = str_replace(array("\r", "\n"), "", $APIresult);
		
		$ALL = Array(
			'BTC' => $BTCAPIresult,
			'XCP' => $APIresult);
		array_push($response, $ALL);
	}
	
	
	
	echo json_encode($response);
?>