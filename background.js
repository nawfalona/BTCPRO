(function () {
	var price=0;
	var prevPrice=0;
	var up=true;
    function updateBadgeText(price) {
        chrome.browserAction.setBadgeText({
            text: String(price)
        });
		chrome.browserAction.setTitle({
            title: 'MOON!'
        });
    }
    function updateBadge() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                price = response['last'];
                updateBadgeText(price);
            }
			if(price>=prevPrice){
			setupBadge(up);}else{setupBadge(!up);}
			prevPrice=price;

        };
        xhr.send();
    }
    function setupInterval() {
        window.setInterval(function () {
            updateBadge();
        }, 10000);
    }
    function setupBadge(up) {
		if(up==true){
			setTimeout(function(){chrome.browserAction.setBadgeBackgroundColor({color: "#009E73"});},1000);
		}else{
			setTimeout(function(){chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});},1000);
		}
		chrome.browserAction.setBadgeBackgroundColor({
            color: "#f9a43f"
        });
    }
    setupInterval();
})();
