var elementInfo = document.activeElement
elementInfo.style.color = 'white'
elementInfo.style.backgroundColor = 'white'
chrome.storage.sync.get(["keyPass"]).then ((valueOfKey) => {
	var keyPassword = valueOfKey.keyPass
	elementInfo.value+=keyPassword.trim()
});
$(document).ready(function() {
    $(elementInfo).on("contextmenu", function(e) {
        return false;
        });
    })	

$(document).ready(function(){
  $(elementInfo).bind("cut copy paste",function(e) {
     e.preventDefault();
  });
});
	