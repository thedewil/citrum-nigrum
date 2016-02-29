// Global variables
var active = false;
// ==UserScript==

// @name           ekşi sözlük göz yakmayan tema
// @description    ekşi sözlük göz yakmayan tema
// @include        https://eksisozluk.com
// @version 1.21
// ==/UserScript==

// Last updated : Monday, February 26, 2016.

function activate(){
	
	// JavaScript natif
    head  = document.getElementsByTagName('head')[0];
    link = document.createElement('link');
    link.id   = "citrumnigrum_css";
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.extension.getURL('citrumnigrum.css');
    link.media = 'all';
    head.appendChild(link);

    active = true;
}


/* ---------------------------- HOME ---------------------------- */


	chrome.extension.sendMessage({method: "isActivated"}, function(response){
			if (response.status == "true"){
				activate();
			}
		});

	var myPort = chrome.extension.connect();

	myPort.onMessage.addListener(function(data){
		if ( data == "true" ){
			if (!active){
				activate();
			}
		}
		else{
			if (active){
				head.removeChild(link);

				active = false;
			}
		}
	});

