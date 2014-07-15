// global
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

// load wallet from master public key
function loadWallet(masPubKey, numAddr){
	var numAddr = (typeof numAddr !== 'undefined' ? numAddr : 3);
		
	// create new HD wallet form master public key
	PUBLIC_WALLET.HK = new bitcore.HierarchicalKey(masPubKey);
	
	// generate addresses
	PUBLIC_WALLET.addresses = [];
	for (var i = 0; i < numAddr; i++){
		var thisAddr = {};
		thisAddr.address = bitcore.Address.fromPubKey( PUBLIC_WALLET.HK.derive('m/' + i).eckey.public ).toString();
		PUBLIC_WALLET.addresses.push(thisAddr);
	}
/*
	// get address information via BLOCKSCAN API
	for (var i = 0; i < PUBLIC_WALLET.addresses.length; i++){	
		$.ajax({
			url: 'http://blockscan.com/api2.aspx?module=balance&address=' + PUBLIC_WALLET.addresses[i].address,
			jsonp: "callback",
			dataType: "jsonp",
		 
			// tell YQL what we want and that we want JSON
			data: {
				q: "select title,abstract,url from search.news where query=\"cat\"",
				format: "json"
			},
		 
			// work with the response
			success: function( response ) {
				console.log( response ); // server response
			}
		});
		
	
	
			PUBLIC_WALLET.addresses[i].info = $.getJSON('http://blockscan.com/api2.aspx?module=balance&address=' + PUBLIC_WALLET.addresses[i].address,
														function(data){return data});
*/
	}

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
	
console.log(WALLET);
	
	// load new wallet from master public key
	loadWallet(WALLET.masterPublicKey);
}


/*



// load bitcore
var bitcore = require('bitcore');

// scrape master public key from logged in counterwallet
var MASPUBKEY = WALLET.BITCOIN_WALLET.HierarchicalKey.derive('m/0\'/0').extendedPublicKeyString();

// create new HD wallet form master public key
var NEWHDWALLET = new bitcore.HierarchialKey(MASPUBKEY);

// generate addresses
var HOWMANY = 3;
var ADDRESSES = [];
for (i = 0; i < HOWMANY; i++){
	var thisAddr = [];
	thisAddr[0] = bitcore.Address.fromPubKey( SHIT.derive('m/' + i).eckey.public ).toString();
	ADDRESSES.push(thisAddr);

}

// to get json data from url asyncronously
// ref: http://stackoverflow.com/questions/2499567/how-to-make-a-json-call-to-a-url
function getJSON(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

}

// query blockscan API
for (j = 0; j < ADDRESSES.length; j++){
  var bsAPi = 'http://blockscan.com/api2.aspx?module=balance&address=';
  var thisAddr = ADDRESSES[j][0];
  ADDRESSES[j][1] = getJSON(bsAPi + thisAddr, function(data){return data;});
}
*/