
// This file handles style changes to Acquia's interface. 

  ////////////////////////////////////////////////////////////////////////
  // Stylize Landing Page asset rows
  function addStyleToWrappingTrElements() {
    var aTags = document.getElementsByTagName('a');
  
    // If using border
    var styles = [
      { keyword: 'DIQ; Primary', color: '#009963' },
      { keyword: 'SJ; Primary;', color: '#990000' },
      { keyword: 'PS;', color: '#2196F3' },
      { keyword: 'Partial;', color: '#adadad' }
      // Add more keyword-color mappings here
    ];

  
    for (var i = 0; i < aTags.length; i++) {
      var text = aTags[i].textContent;
  
      for (var j = 0; j < styles.length; j++) {
        var keyword = styles[j].keyword;
        var color = styles[j].color;
  
        // target Row and add border
        if (text.includes(keyword)) {
          var trElement = aTags[i].closest('tr');
          if (trElement) {
            trElement.style.borderLeft = `5px solid ${color}`;
          }
          break; // Exit the loop once a match is found
        }
      }
    }
  }
  
  ////////////////////////////////////////////////////////////////////////
  // Remove columns based on class names
  function removeColumnsByClassNames() {
    var columnClassNames = [
    '.col-page-hits', 
    '.col-page-category', 
    '.col-page-dateAdded', 
    '.col-page-createdByUser', 
    '.col-page-submission',
    '.col-form-category',
    '.col-form-dateAdded',
    '.col-form-createdby',
    '.col-email-dateAdded',
    '.col-email-createdByUser'
  ];

    // Remove columns by class names
    columnClassNames.forEach(function(className) {
      var thElements = document.querySelectorAll('th' + className);

      for (var i = 0; i < thElements.length; i++) {
        var th = thElements[i];
        var columnIndex = th.cellIndex;

        // Remove the column from the DOM
        var table = th.closest('table');
        var rows = table.rows;

        for (var j = 0; j < rows.length; j++) {
          var cell = rows[j].cells[columnIndex];
          cell.parentNode.removeChild(cell);
        }
      }
    });
  }


///////////////////////////////////////////////////////////////////////
// Add select to help filter landing page and form assets.

function createAcquiaFilterSelect() {
  var existingSelect = document.querySelector("select#acquia-utilities-landing-select");

  console.log("Looking for existing select");

  if (existingSelect) {
    return; // Return early if the select element already exists
  }

  var container = document.querySelector("div.box-layout > .text-right");
  var select = document.createElement("select");
  select.id = "acquia-utilities-landing-select"; // Add the id attribute
  select.classList.add("form-control");
  select.setAttribute("style", "font-size: 1.5rem");

  // Check if the page URL contains "s/forms"
  if (window.location.href.includes("s/forms")) {
    var options = [
      { text: "Filter options", value: "" },
      { text: "Student Journey", value: "Student Journey;" },
      { text: "DIQ", value: "Decision IQ;" }
    ];
  } else if (window.location.href.includes("s/pages")) {
    var options = [
      { text: "Filter options", value: "" },
      { text: "Student Journey", value: "SJ; Primary;" },
      { text: "Paid Search", value: "PS;" },
      { text: "DIQ", value: "DIQ; Primary;" },
      { text: "General Pages", value: "General;" },
      { text: "Redirects", value: "Redirect" },
      { text: "Partial", value: "Partial" }
    ];
  } else {
    // Return early if the URL does not match either condition
    return;
  }

  // Iterate over the options and create option elements
  options.forEach(function(option) {
    var optionElement = document.createElement("option");
    optionElement.textContent = option.text;
    optionElement.value = option.value;
    select.appendChild(optionElement);
  });

  // Add change event listener to the select element
  select.addEventListener("change", function() {
    var selectedOption = this.value;
    var input = document.querySelector("#form-search, #list-search");
    var filterButton = document.querySelector("#btn-filter");
    var pageList = document.querySelector(".page-list");

    // Check if the input field already has a value
    if (input.value.trim() !== '') {
      // Find the button with ID "btn-filter" and trigger a click event
      filterButton.click();

      // Create a new mutation observer
      var observer = new MutationObserver(function(mutationsList) {
        // Check if the mutations occurred on the .page-list element
        if (mutationsList.some(function(mutation) {
          return mutation.target === pageList;
        })) {
          // Execute the rest of the code once .page-list has updated
          input.value = selectedOption;
          filterButton.click();

          // Disconnect the observer after the first set of mutations
          observer.disconnect();
        }
      });

      // Start observing changes in .page-list
      observer.observe(pageList, { childList: true, subtree: true });
    } else {
      // If the input is blank, execute the last two lines of code
      input.value = selectedOption;
      filterButton.click();
    }
  });

  // Insert the select element into the container
  container.appendChild(select);
}

  ////////////////////////////////////////////////////////////////////////
  // Functions that will trigger whenever the dom is edited 
  function handleDOMChanges() {

    setTimeout(function() {
      addStyleToWrappingTrElements();
      removeColumnsByClassNames();
      createAcquiaFilterSelect();
    }, 200);
  }
  
  ////////////////////////////////////////////////////////////////////////
  // Function to initialize the MutationObserver
  function initializeMutationObserver() {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === "childList") {
          handleDOMChanges();
        }
      });
    });
  
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
  
  // Call the function to handle initial DOM changes
  handleDOMChanges();
  
  // Initialize the MutationObserver
  initializeMutationObserver();
