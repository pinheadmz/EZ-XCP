<?php ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="favicon.ico">

	<title>Watch-Only Counterwallet</title>

	<!-- Bootstrap core CSS -->
	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>

<body>

<!-- Main jumbotron for a primary marketing message or call to action -->
<div class="jumbotron">
	<div class="container">
		<h1>Watch-Only Counterwallet</h1>
		
		<div id="start" style="position:relative">
			<div id="loading" style="	display: none;
										position: absolute;
										width: 100%;
										height: 100%;
										background-color: rgba(163, 163, 163, 0.44);
										color: white;
										z-index: 100;
										text-align: center;
										line-height: 400px;
										font-size: 130px;
										border-radius: 10px;">Loading...</div>
			<div style="border:2px solid black;border-radius:10px;padding:20px">
				<p>Enter your 12-word <a href="https://counterwallet.co/" target="_blank">Counterwallet</a> passphrase below to generate a watch-only wallet.<br>
				<i>Your passphrase is not sent to the server</i></p>
				<div class="form-group row">
					<input type="password" class="form-control" id="CWpassphrase" placeholder="Enter your 12-word Counterwallet passphrase" value="parent brush vast freak duck blend worst press cage smile silly knife">
				</div>
				<div class="form-group row">
					<div class="input-group">
						<span class="input-group-addon">
							<input name="showPP" id="showPP" type="checkbox" onchange="document.getElementById('CWpassphrase').type = this.checked ? 'text' : 'password'">
						</span>
						<span class="input-group-addon">
							<label for="showPP">Show</label>
						</span>
						<button type="submit" onclick="acceptPP()" class="btn btn-success" id="acceptCWpassphrase" style="float:right">Generate watch-only wallet</button>
					</div>			
				</div>
			</div>
			<br>
			<div style="border:2px solid black;border-radius:10px;padding:20px">
				<p>Already have a watch-only wallet? Enter your easy identifier here to retrieve it</p>
				<div class="form-group row">
					<div class="col-xs-6">
						<input type="text" class="form-control" id="watchID" placeholder="Easy identifer" maxlength="16">
					</div>
					<div class="col-xs-6">
						<input type="password" class="form-control" id="watchKey" placeholder="Decryption password (optional)">
					</div>
				</div>
				<div class="form-group row">
						<button type="submit" onclick="retrieve()" class="btn btn-success" id="acceptRetrieve" style="float:right">Retrieve</button>
				</div>
			</div>
		</div>
		<div id="reset" style="display:none">
			<div class="form-group row">
					<button type="submit" onclick="reset()" class="btn btn-default" id="reset" >Reset with new wallet</button>
			</div>
		</div>
				
	</div>
</div>

<div class="container">
	<!-- Example row of columns -->
	<div style="display:none" id="mainDisplay">
		<div class="row" >
			<div class="col-md-4">
				<h2>Master public key:</h2>
				<p><pre id="MasPubKeyDisplay"></pre></p>
			</div>
			<div class="col-md-4">
				<h2>Derived addresses:</h2>
				<p><pre id="addressesDisplay"></pre></p>
				<p><a class="btn btn-default" onclick="loadMoreAddresses()" role="button">Load 3 more addresses...</a></p>
			</div>
			<div class="col-md-4">
				<h2>Store this watch-only wallet on server:</h2>
				<input type="text" class="form-control" id="newID" placeholder="Enter an easy identifer" maxlength="16">
				<small><i>(one word, alpha-numeric only)</i></small><br><br>
				<input type="password" class="form-control" id="newIDkey" placeholder="(optional) Encrypt with password">
				<small><i>(password is not sent to server)</i></small><br><br>
				<a class="btn btn-success" onclick="store()" role="button">Store on server</a><br>
				<small><i>Your master public key (optionally encrypted) is sent to the server.<br>No one can steal your coins or assets with just your public key</i></small><br><br>
			</div>

		</div>
		<div class="row">
			<div class="col-md-4">
				<h2>Address asset balances:</h2>
				<div id="balanceDisplay"></div>
			</div>
			<div class="col-md-4">
				<h2>Wallet total balances:</h2>
				<div id="totalDisplay"></div>
			</div>
		</div>
	</div>
	<hr>
	<footer>
		<p>Created by Matthew Zipkin</p>
		<p><i>tips? <a href="bitcoin:1NpGmWoQrbNhtjFSRSnZjbNozyXK4ZqD7e">1NpGmWoQrbNhtjFSRSnZjbNozyXK4ZqD7e</a></i></p>
		<p>Built with <a href="http://bitcore.io/" target="_blank">Bitcore</a>, data from <a href="http://www.blockscan.com/" target="_blank">Blockscan API</a></p>
		<p><a href="https://github.com/pinheadmz/EZ-XCP" target="_blank">View source on GitHub</a></p>
	</footer>
</div> <!-- /container -->


<!-- Bootstrap -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<!-- Crypto -->
<script src="js/sha256.js"></script>
<script src="js/enc-base64-min.js"></script>
<script src="js/aes.js"></script>
<!-- Bitcore, CW, and my code -->
<script src="js/bitcore.js"></script>
<script src="js/mnemonic.js"></script>
<script src="js/ezxcp.js"></script>
</body>
</html>