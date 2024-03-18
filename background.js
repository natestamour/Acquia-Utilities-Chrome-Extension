
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


////////////////////////////////////////////////////////////////////////
// ! TEMPORARY FIX FOR ACQUIA FORM
// Function to hide element
function hideElement(tabId) {
  chrome.scripting.executeScript({
      target: {tabId: tabId},
      func: () => {
          var element = document.querySelector('#mauticform_buttons_apply_toolbar');
          if (element) {
              element.style.display = 'none';
          }
      }
  });
}

// Event listener for when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab's URL matches the pattern
  if (tab.url && tab.url.match(/https:\/\/.*\/s\/forms\/edit\/.*/)) {
      // Call function to hide element
      hideElement(tabId);
  }
});

///////////// 
// ! END FIX