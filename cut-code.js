///////////////////////////////////////////////////////////////////////
// Add select to help filter landing page assets.

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

  // Check if the page URL contains "s/forms"
  if (window.location.href.includes("s/forms")) {
    var options = [
      { text: "Option 1", value: "Value 1" },
      { text: "Option 2", value: "Value 2" },
      { text: "Option 3", value: "Value 3" }
    ];
  } else if (window.location.href.includes("s/pages")) {
    var options = [
      { text: "Redirects", value: "Redirect" },
      { text: "Partial", value: "Partial" },
      { text: "Student Journey", value: "SJ; Primary;" },
      { text: "DIQ", value: "DIQ; Primary;" },
      { text: "Paid Search", value: "PS;" }
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
