
////////////////////////////////////
// Acquia Select Auto Filler
// Variables look for IDs on both form and field pages.

// looks for message coming from background.js that sends when button in popup.html is clicked.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request && request.data) {

    const inputData = request.data.split('\n');
    const hiddenInput = document.getElementById('leadfield_properties_itemcount') || document.getElementById('formfield_properties_list_itemcount');
    
    // Remove standard values, then add them back later in proper order.
    const indexToRemove = inputData.indexOf("Other|Other");
    if (indexToRemove !== -1) {
      inputData.splice(indexToRemove, 1);
    }
    const indexToRemoveUnmapped = inputData.indexOf("Unmapped Value|Unmapped Value");
    if (indexToRemoveUnmapped !== -1) {
      inputData.splice(indexToRemoveUnmapped, 1);
    }
    const indexUnsure = inputData.indexOf("Unsure|Unsure");
    if (indexUnsure !== -1) {
      const unsureValue = inputData.splice(indexUnsure, 1);
      inputData.push(unsureValue[0]);
    }
    if (hiddenInput.id === 'leadfield_properties_itemcount') {
      inputData.push("Other|Other", "Unmapped Value|Unmapped Value");
    }

    let initialItemCount = parseInt(hiddenInput.value);

    // Check if initialItemCount is greater than inputData.length
    if (initialItemCount > inputData.length) {
      const spanElements = document.querySelectorAll('.input-group-addon.preaddon');

      if (spanElements.length > 0) {
        const lastSpanElement = spanElements[spanElements.length - 1];
        lastSpanElement.click();
      }
    } else {

      while (initialItemCount < inputData.length) {
        const addItemButton = document.getElementById('leadfield_properties_additem') || document.getElementById('formfield_properties_list_additem');
        addItemButton.click();

        initialItemCount = parseInt(hiddenInput.value);
      }
    }

    // Function to get program name and value inputs
    const getProgramInputs = (index) => {
      const programNameInputs = document.querySelectorAll(`input[id$="_properties_list_${index}_label"], input[id$="_properties_list_list_${index}_label"]`);
      const programValueInputs = document.querySelectorAll(`input[id$="_properties_list_${index}_value"], input[id$="_properties_list_list_${index}_value"]`);
      return { programNameInputs, programValueInputs };
    };

    // Add programs and values
    for (let i = 0; i < inputData.length; i++) {
      const programParts = inputData[i].split('|');

      if (programParts.length === 2) {
        const programName = programParts[0].trim();
        const value = programParts[1].trim();

        const { programNameInputs, programValueInputs } = getProgramInputs(i);

        for (let j = 0; j < programNameInputs.length; j++) {
          const programNameInput = programNameInputs[j];
          const programValueInput = programValueInputs[j];

          if (programNameInput && programValueInput) {
            programNameInput.value = programName;
            programValueInput.value = value;
          }
        }
      }
    }
  }
});

////////////////////////////////////
// Dynamic Content Stylizer

// Function to apply CSS styles to paragraphs and links
function applyStylesToElements(elements, styles) {
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    element.style.cssText = styles;
  }
}

// Function to remove all <span> and <br> tags within paragraphs element
function removeTags(paragraphs) {

  for (var i = 0; i < paragraphs.length; i++) {

    var paragraph = paragraphs[i];
    var spanTags = paragraph.getElementsByTagName('span');
    var brTags = paragraph.getElementsByTagName('br');

    // Remove all <span> tags
    while (spanTags.length > 0) {
      var spanTag = spanTags[0];
      spanTag.outerHTML = spanTag.innerHTML;
    }

    // Remove <br> tags
    while (brTags.length > 0) {
      var brTag = brTags[0];
      brTag.parentNode.removeChild(brTag);
    }
  }
}

// Function to get paragraphs and links inside cke_editable body
function getElementsInsideCKEEditableBody(bodyElement) {
  if (bodyElement) {
    var bodyDocument = bodyElement.contentDocument;
    
    if (bodyDocument) {
      // Select '.cke_editable p' elements that are not inside an <li> element
      var paragraphs = bodyDocument.querySelectorAll('.cke_editable p:not(li p)');
      var links = bodyDocument.querySelectorAll('.cke_editable a');

      return {
        paragraphs: paragraphs,
        links: links
      };
    }
  }
  return null;
}

// Function to apply styles to paragraphs and links inside all cke_editable bodies
function applyStylesToAllCKEEditableBodies(paraStylesData, linkStyleData) {

  var bodyElements = document.querySelectorAll('iframe.cke_reset');

  for (var i = 0; i < bodyElements.length; i++) {

    var elements = getElementsInsideCKEEditableBody(bodyElements[i]);

    if (elements) {
      if (paraStylesData) {
        removeTags(elements.paragraphs);
        applyStylesToElements(elements.paragraphs, paraStylesData);
        applyStylesToElements(elements.links, linkStyleData);
      }
    }
  }
}

// Message listener to receive styles from background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request && request.paraStylesData) {
    applyStylesToAllCKEEditableBodies(request.paraStylesData, request.linkStyleData);
  }
});
