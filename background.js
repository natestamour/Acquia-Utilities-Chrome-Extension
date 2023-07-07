
////////////////////////////////////
// Auto Filler

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request && request.data) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      if (tabs && tabs[0]) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          files: ['content.js'],
        }, function() {

          // Callback function to communicate with content.js
          chrome.tabs.sendMessage(tabs[0].id, {data: request.data});
        });
      }
    });
  }
});

// ////////////////////////////////////
// // Dynamic Stylizer
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request && request.paraStylesData) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      if (tabs && tabs[0]) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          files: ['content.js'],
        }, function() {

          chrome.tabs.sendMessage(tabs[0].id, {
            paraStylesData: request.paraStylesData,
            linkStyleData: request.linkStyleData
          });
        });
      }
    });
  }
});
