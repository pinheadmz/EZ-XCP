// global
var bitcore = require('bitcore');
var WALLET = {};
var PUBLIC_WALLET = {};

// counterwallet identifier
function getCWID(passphrase){
	var hash = CryptoJS.SHA256(CryptoJS.SHA256(passphrase)).toString(CryptoJS.enc.Base64);
	return hash;
}

// accept passphrase 
function checkPP(passphrase){
	var cleanPP = $.trim(passphrase.toLowerCase());
	
	var words = cleanPP.split(' ');
    if (words.length != 12 && (words.length != 13 || words[0] != 'old')) {
      return false;
    }

    if (words.length==13) {
      words.shift();
    }
    
    var valid = true;
    words.forEach(function (word) {
       if (Mnemonic.words.indexOf(word) == -1) {
          valid = false;
       }
     });
     if (!valid)
     	return false;
     else
	     return cleanPP;
}

// click accept button
function acceptPP(){
	var passphrase = $('#CWpassphrase').val();
	var cleanPP = checkPP(passphrase);
	if(!cleanPP)
		alert("Passphrase Error");
	else
		genWallet(cleanPP);
}

// update info display
function refreshDisplay(){
	$('#mainDisplay').slideDown();
	$('#MasPubKeyDisplay').html(PUBLIC_WALLET.HK.extendedPublicKeyString());
	$('#addressesDisplay').html('');
	$('#balanceDisplay').html('');
	$('#totalDisplay').html('');
	PUBLIC_WALLET.assets = {};
	$.each(PUBLIC_WALLET.addresses, function(i,v){
		$('#addressesDisplay').append(v.address + '\r\n');

		if (v.info.status == "error"){
			newBal = '<p><pre>';
			newBal += '<a href="http://www.blockscan.com/address.aspx?q=' + v.address + '" target="_blank">' + v.address +'</a></pre>';
			newBal += 'No assets</p><br>';
		} else {
			newBal = '<p><pre>';
			newBal += '<a href="http://www.blockscan.com/address.aspx?q=' + v.address + '" target="_blank">' + v.address +'</a></pre>';
			$.each(v.info.data, function(ii, vv){
				newBal += vv.asset + " balance: " + vv.balance + "<br>";
				// update wallet total balances
				//PUBLIC_WALLET.assets[vv.asset] = (PUBLIC_WALLET.assets[vv.asset] ? (PUBLIC_WALLET.assets[vv.asset] + vv.balance) : vv.balance);
				PUBLIC_WALLET.assets[vv.asset] =  (PUBLIC_WALLET.assets[vv.asset] ? parseFloat(PUBLIC_WALLET.assets[vv.asset]) : 0) + parseFloat(vv.balance);
			});
			newBal += '</p><br>';
		}
		$('#balanceDisplay').append(newBal);
	});
	$.each(PUBLIC_WALLET.assets, function(i, v){
		$('#totalDisplay').append(i + ": " + v + "<br>");
	});
}

// add derivative addresses to wallet
function loadMoreAddresses(){
	var currNum = PUBLIC_WALLET.addresses.length;
	var numAddr = currNum + 3;
	
	// generate addresses
	for (var i = currNum; i < numAddr; i++){
		var thisAddr = {};
		thisAddr.address = bitcore.Address.fromPubKey( PUBLIC_WALLET.HK.derive('m/' + i).eckey.public ).toString();
		PUBLIC_WALLET.addresses.push(thisAddr);
	}
	
	// get address information via BLOCKSCAN API
	$.post('blockscan.php', 
			{addrs: PUBLIC_WALLET.addresses},
			function(response){
				$.each(response, function(i,v){
					PUBLIC_WALLET.addresses[i].info = JSON.parse(v);				
				});
			},
			'json'
	).done(function(){refreshDisplay()});
}

// load wallet from master public key
function loadWallet(masPubKey){
	// create new HD wallet form master public key
	PUBLIC_WALLET.HK = new bitcore.HierarchicalKey(masPubKey);
	PUBLIC_WALLET.masterPublicKey = masPubKey;
	
	// generate first four addresses
	PUBLIC_WALLET.addresses = [];
	PUBLIC_WALLET.assets = {};
	loadMoreAddresses();
}

// decrypt wallet if necesary
function openWallet(wallet){
	// decrypted?
	if (wallet.substr(0,1) === '*'){
		if (!$('#watchKey').val()){
			alert('Error: This wallet is encrypted, password required');
			return false;
		}
		// decrypt now
		try {
			masPubKey = CryptoJS.AES.decrypt(wallet.substr(1), $('#watchKey').val()).toString(CryptoJS.enc.Utf8);
		} catch(e) {
			alert('Error: Incorrect password');
			return false;
		}

		loadWallet(masPubKey);	
	} else{
		loadWallet(wallet);
	}
}

// generate wallet
function genWallet(cleanPP){
	// hashed wallet ID counterwallet servers store and associate with preferences, wallet labels, etc.
	WALLET.CWID	= getCWID(cleanPP);

	// create bitcore object with HD keys based on seed from passphrase
	var m = new Mnemonic(cleanPP.split(' '));
	var hex = m.toHex();
	WALLET.HK = new bitcore.HierarchicalKey.seed(hex, 'livenet');

	// get counterwallet base master public key - not the root
	WALLET.masterPublicKey = WALLET.HK.derive('m/0\'/0').extendedPublicKeyString();
	
	// load new wallet from master public key
	loadWallet(WALLET.masterPublicKey);
}

// send master public key to server for storage
function store(){
	// TODO: test for alpha-num
	
	var mpk = PUBLIC_WALLET.masterPublicKey;
	if ($('#newIDkey').val())
		mpk = '*' + CryptoJS.AES.encrypt(mpk, $('#newIDkey').val()).toString()

	$.post('store.php', 
			{mpk: mpk,
			id: $('#newID').val()},
			function(response){
				alert(response)
			}
	);
}

// retrieve master public key from server using easy ID
function retrieve(){
	$.post('retrieve.php', 
			{id: $('#watchID').val()},
			function(response){
				if(response === 'false')
					alert('Wallet retrieval error');
				else
					openWallet(response)
			}
	);
}