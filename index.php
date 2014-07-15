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
<? /*
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Easy Counterwallet</a>
		</div>
		<div class="navbar-collapse collapse">
			<form class="navbar-form navbar-right" role="form">
				<div class="form-group">
					<input type="text" placeholder="Identifier" class="form-control">
				</div>
				<div class="form-group">
					<input type="password" placeholder="Password" class="form-control">
				</div>
				<button type="submit" class="btn btn-success">Get Wallet</button>
			</form>
		</div><!--/.navbar-collapse -->
	</div>
</div>
*/ ?>

<!-- Main jumbotron for a primary marketing message or call to action -->
<div class="jumbotron">
	<div class="container">
		<h1>Watch-Only Counterwallet</h1>
		
		<div style="border:2px solid black;border-radius:10px;padding:20px">
			<p>Enter your 12-word <a href="https://counterwallet.co/" target="_blank">Counterwallet</a> passphrase below to create a watch-only wallet.<br>This information will not leave your browser!</p>
			<div class="form-group row">
				<input type="password" class="form-control" id="CWpassphrase" placeholder="Enter your 12-word Counterwallet passphrase" value="accept rare smoke hook stain reply lip alas painful dirt tight flood">
			</div>
			<div class="form-group row">
				<div class="input-group">
					<span class="input-group-addon">
						<input name="showPP" id="showPP" type="checkbox" onchange="document.getElementById('CWpassphrase').type = this.checked ? 'text' : 'password'">
					</span>
					<span class="input-group-addon">
						<label for="showPP">Show</label>
					</span>
					<button type="submit" onclick="acceptPP()" class="btn btn-success" id="acceptCWpassphrase" style="float:right">Create watch-only wallet</button>
				</div>			
			</div>
		</div>
		<br>
		<div style="border:2px solid black;border-radius:10px;padding:20px">
			<p>Already have a watch-only wallet? Enter your easy identifier here to retrieve it</p>
			<div class="form-group row">
				<div class="col-xs-5">
					<input type="text" class="form-control" id="watchID" placeholder="Enter your easy identifer">
				</div>
				<button type="submit" onclick="retrieve()" class="btn btn-success" id="acceptRetrieve" style="float:right">Retrieve</button>
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
				<input type="text" class="form-control" id="newID" placeholder="Enter an easy identifer"><br>
				<a class="btn btn-success" onclick="store()" role="button">Store on server</a>
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
		<p>Created by Matthew Zipkin 2014</p>
	</footer>
</div> <!-- /container -->


<!-- Bootstrap -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<!-- Crypto -->
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js"></script>
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/enc-base64-min.js"></script>
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js"></script>
<!-- Bitcore, CW, and my code -->
<script src="js/bitcore.js"></script>
<script src="js/mnemonic.js"></script>
<script src="js/ezxcp.js"></script>
</body>
</html>
