
////////////////////////////////////
// Run the right functionality based off of url
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

  var currentUrl = tabs[0].url;
  var autoFillerContent = document.getElementById('autoFiller');
  var dynamicStylerContent = document.getElementById('dynamicStyler');

  if (currentUrl.includes("/forms/edit") || currentUrl.includes("/contacts/fields/edit/")) {
    autoFillerContent.style.display = 'block';
    initializeProgramList();
  } 
  else if (currentUrl.includes("/emails/edit")) {
    dynamicStylerContent.style.display = 'block';
    initializeDynamicStyler();
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

// Add event listener and save content
function handleTextAreaInput(textArea, key) {
  textArea.addEventListener('input', function() {
    var content = textArea.value;
    saveContentToLocalStorage(key, content);
  });
}

// reset button functionality
function setFormReset(formId, resetBtnId) {

  const form = document.getElementById(formId);
  const resetBtn = document.getElementById(resetBtnId);

  if (form && resetBtn) {
    resetBtn.addEventListener('click', (event) => {
      event.preventDefault();
      form.reset();

        // Trigger input event for textareas to save their values
        const textareas = form.querySelectorAll('textarea');
        textareas.forEach((textarea) => {
          textarea.dispatchEvent(new Event('input'));
        });
    });
  }
}

////////////////////////////////////
// Select Auto Filler
function initializeProgramList() {
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
}

////////////////////////////////////
// Dynamic Content Stylizer
function initializeDynamicStyler() {
  var applyBtn = document.getElementById('applyBtn');
  var paraStylesInput = document.getElementById('paraStylesInput');
  var linkStylesInput = document.getElementById('linkStylesInput');

  // Load previous values
  loadContentFromLocalStorage('paraStylesInputContent', paraStylesInput);
  loadContentFromLocalStorage('linkStylesInputContent', linkStylesInput);

  // save paragraph styles and link styles text areas
  handleTextAreaInput(paraStylesInput, 'paraStylesInputContent');
  handleTextAreaInput(linkStylesInput, 'linkStylesInputContent');

  // Reset button
  setFormReset('dynamicStylerForm', 'resetBtn');

  // send message with data on button click
  applyBtn.addEventListener('click', function() {
    
    var paraStyles = paraStylesInput.value;
    var linkStyles = linkStylesInput.value;

    chrome.runtime.sendMessage({paraStylesData: paraStyles, linkStyleData: linkStyles});
  });
}