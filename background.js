	
	var iconActivePath = "images/icon_19.png";
	var iconRestPath = "images/icon_19_deactivate.png";
	var BG = chrome.extension.getBackgroundPage();
	
	if (localStorage.activated == undefined)
	{
		setIcon(true);
	}

	var portsByTabId = {};

	chrome.extension.onConnect.addListener(function(port) {
		portsByTabId[port.sender.id] = port;
	});

	function sendMessage(message)
	{
		for (var tabid in portsByTabId)
		{
			var port = portsByTabId[tabid];
			try
			{
				port.postMessage(message);
			}
			catch (e)
			{
				delete portsByTabId[tabid];
			}
		}
	}
	
	function setIcon(citrumnigrum){
		if (!citrumnigrum)
		{
			localStorage.activated = "false";
			chrome.browserAction.setIcon({path: iconRestPath});
		}
		else
		{
			localStorage.activated = "true";
			chrome.browserAction.setIcon({path: iconActivePath});
		}
		sendMessage(localStorage.activated);
	}

	function updateIcon(){
		if (localStorage.activated != "false")
		{
			localStorage.activated = "false";
			chrome.browserAction.setIcon({path: iconRestPath});
		}
		else
		{
			localStorage.activated = "true";
			chrome.browserAction.setIcon({path: iconActivePath});
		}

		sendMessage(localStorage.activated);
	}

	chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
		if (request.method == "isActivated")
		  sendResponse({status: localStorage.activated});
		else
		  sendResponse({});
	});

	if (localStorage.activated != "false"){
		chrome.browserAction.setIcon({path: iconActivePath});
	}
	else
	{
		chrome.browserAction.setIcon({path: iconRestPath});
	}
	
	chrome.browserAction.onClicked.addListener(updateIcon);
	
	