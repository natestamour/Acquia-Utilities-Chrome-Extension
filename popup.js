
////////////////////////////////////
// show/hide Popup HTML content based off of url
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var currentUrl = tabs[0].url;

  var autoFillerContent = document.getElementById('autoFiller');
  var dynamicStylerContent = document.getElementById('dynamicStyler');

  if (currentUrl.includes("/forms/edit") || currentUrl.includes("/contacts/fields/edit/")) {
    autoFillerContent.style.display = 'block';
  } 
  else if (currentUrl.includes("/emails/edit")) {
    dynamicStylerContent.style.display = 'block';
  }
});


////////////////////////////////////
// Global Functions

// load content from local storage
function loadContentFromLocalStorage(key, element) {
  chrome.storage.local.get(key, function(result) {
    if (result[key]) {
      element.value = result[key];
    }
  });
}

// save content to local storage
function saveContentToLocalStorage(key, content) {
  chrome.storage.local.set({[key]: content});
}


////////////////////////////////////
// Select Auto Filler
document.addEventListener('DOMContentLoaded', function() {

  var listSaveButton = document.getElementById('listSaveButton');
  var programListArea = document.getElementById('programListArea');

  // Function to get the current value of programList
  function getProgramList() {
    return programListArea.value.trim();
  }

  // load previous list
  loadContentFromLocalStorage('programListAreaContent', programListArea);

  programListArea.addEventListener('input', function() {
    var content = programListArea.value;

    saveContentToLocalStorage('programListAreaContent', content);
  });

  listSaveButton.addEventListener('click', function() {

    var currentProgramList = getProgramList();

    chrome.runtime.sendMessage({data: currentProgramList});

  });
});

////////////////////////////////////
// Dynamic Content Stylizer
document.addEventListener('DOMContentLoaded', function() {

  var applyBtn = document.getElementById('applyBtn');
  var paraStylesInput = document.getElementById('paraStylesInput');
  var linkStylesInput = document.getElementById('linkStylesInput');

  // // Load previous values
  // loadContentFromLocalStorage('paraStylesInputContent', paraStylesInput);
  // loadContentFromLocalStorage('linkStylesInputContent', linkStylesInput);

  // // save paragraph styles text area
  // paraStylesInput.addEventListener('input', function() {
  //   var content = paraStylesInput.value;

  //   saveContentToLocalStorage('paraStylesInputContent', content);
  // });

  // // save link styles text area
  // linkStylesInput.addEventListener('input', function() {
  //   var content = linkStylesInput.value;

  //   saveContentToLocalStorage('linkStylesInputContent', content);
  // });

  // send message with data on button click
  applyBtn.addEventListener('click', function() {

    var paraStyles = paraStylesInput.value;
    var linkStyles = linkStylesInput.value;
    
    console.log('sending message to background.js');

    chrome.runtime.sendMessage({paraStylesData: paraStyles, linkStyleData: linkStyles});

  });
});