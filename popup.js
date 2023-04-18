
////////////////////////////////////
// show/hide content based off of url
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var currentUrl = tabs[0].url;

  // Auto filler
  var autoFillerContent = document.getElementById('autoFiller');

  if (currentUrl.includes("/forms/edit") || currentUrl.includes("/contacts/fields/edit/")) {
    autoFillerContent.style.display = 'block';
  }
});

////////////////////////////////////
// Save, Load, then send data to content.js for auto filling. 
document.addEventListener('DOMContentLoaded', function() {

  var listSaveButton = document.getElementById('listSaveButton');
  var programListArea = document.getElementById('programListArea');

  // Function to get the current value of programList
  function getProgramList() {
    return programListArea.value.trim();
  }

  // Load the programListArea content from the local storage when the popup is opened
  chrome.storage.local.get('programListAreaContent', function(result) {
    if (result.programListAreaContent) {
      programListArea.value = result.programListAreaContent;
    }
  });

  // Save the programListArea content to the local storage when the programListArea is changed
  programListArea.addEventListener('input', function() {
    var content = programListArea.value;
    chrome.storage.local.set({'programListAreaContent': content});
  });

  listSaveButton.addEventListener('click', function() {

    var currentProgramList = getProgramList();

    // Store the input text in local storage
    chrome.storage.local.set({data: currentProgramList}, function() {
      // Sends data to background.js
      chrome.runtime.sendMessage({data: currentProgramList});

      console.log(currentProgramList); // Now it should correctly log the value of programList
    });
  });
});