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
	$.each(PUBLIC_WALLET.addresses, function(i,v){
		$('#addressesDisplay').append(v.address + '\r\n');
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
	
	refreshDisplay();
}

// load wallet from master public key
function loadWallet(masPubKey){
	// create new HD wallet form master public key
	PUBLIC_WALLET.HK = new bitcore.HierarchicalKey(masPubKey);
	
	// generate first four addresses
	PUBLIC_WALLET.addresses = [];
	loadMoreAddresses();

	// get address information via BLOCKSCAN API
	$.post('blockscan.php', 
			{addrs: PUBLIC_WALLET.addresses},
			function(response){
				$.each(response, function(i,v){
					PUBLIC_WALLET.addresses[i].info = JSON.parse(v);				
				});			
			},
			'json'
	);

	refreshDisplay();
	console.log(PUBLIC_WALLET);
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