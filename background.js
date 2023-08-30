console.log('background.js')
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		"id": "buildkey",
		"title": "Build key",
		"contexts": ["editable"]
	}),
	chrome.contextMenus.create({
		"id": "usekey",
		"title": "Insert key",
		"contexts": ["editable"]
	})
})

chrome.contextMenus.onClicked.addListener(async(clickData) => {
	if(clickData.menuItemId == 'buildkey'){
		const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!~`#$%^&*(){}][./,';
		function generatePassword(length){
			let result = ' ';
			const charactersLength = characters.length;
			for ( let i = 0; i < length; i++ ){
				result += characters.charAt(Math.floor(Math.random() * charactersLength));
				}return result}
	
		var keyPassword = generatePassword(18)
		chrome.storage.sync.set({"keyPass":keyPassword}).then(() => {
		});
	}
	if(clickData.menuItemId == 'usekey'){
		async function getCurrentTab(){
			const queryOptions = { active: true, currentWindow: true };
			const [tab] = await chrome.tabs.query(queryOptions);
			return tab;
		}
		const tab = await getCurrentTab();
	
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ['cdnjs/jquery.min.js','script.js']
		});
		chrome.scripting.insertCSS({
			target: { tabId: tab.id },
			files: ['styles.css']
		})
	}
})
