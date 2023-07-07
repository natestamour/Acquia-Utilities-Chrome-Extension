
////////////////////////////////////
// Add styles to landing page table items based on landing page name. 
function addStyleToWrappingTrElements() {
  var aTags = document.getElementsByTagName('a');

  // If using border
  // var styles = [
  //   { keyword: 'DIQ; Primary', color: 'blue' },
  //   { keyword: 'SJ; Primary;', color: '#009963' },
  //   { keyword: 'Partial;', color: '#adadad' },
  //   { keyword: 'Redirect;', color: '#ffec83' },
  //   // Add more keyword-color mappings here
  // ];

  // If using background 
  var styles = [
    { keyword: 'DIQ; Primary', color: '#c2e6ff' },
    { keyword: 'SJ; Primary;', color: '#bfffe8' },
    { keyword: 'Partial;', color: '#dedede' },
    { keyword: 'Redirect;', color: '#fcffc5' },
    // Add more keyword-color mappings here
  ];

  for (var i = 0; i < aTags.length; i++) {
    var text = aTags[i].textContent;

    for (var j = 0; j < styles.length; j++) {
      var keyword = styles[j].keyword;
      var color = styles[j].color;

      // target Row and add border
      // if (text.includes(keyword)) {
      //   var trElement = aTags[i].closest('tr');
      //   if (trElement) {
      //     trElement.style.borderLeft = `5px solid ${color}`;
      //   }
      //   break; // Exit the loop once a match is found
      // }

      // target sibling cells and add background
      if (text.includes(keyword)) {
        var tdElements = aTags[i].parentNode.parentNode.querySelectorAll('td');
        if (tdElements) {
          for (var k = 0; k < tdElements.length; k++) {
            tdElements[k].style.background = color;
          }
        }
        break; // Exit the loop once a match is found
      }
    }
  }
}

////////////////////////////////////
// Delete extra cells with junk info 
function deleteVisibleMdLgElements() {
  var tdElements = document.querySelectorAll('td.visible-lg');
  var thElements = document.querySelectorAll('th.visible-lg');

  // Delete <td> elements
  for (var i = 0; i < tdElements.length; i++) {
    var td = tdElements[i];
    td.parentNode.removeChild(td);
  }

  // Delete <th> elements
  for (var j = 0; j < thElements.length; j++) {
    var th = thElements[j];
    th.parentNode.removeChild(th);
  }
}

////////////////////////////////////
// Create a select that facilitates Acquia filtering. 

// Check if the <head> <title> contains "Landing Pages"
var pageTitle = document.querySelector("head title").textContent;
if (pageTitle.includes("Landing Pages")) {
  // Find the div with class .box-layout and its child element with class .text-right
  var container = document.querySelector("div.box-layout > .text-right");

  // Create a select element
  var select = document.createElement("select");
  select.classList.add("form-control");

  // Define the options and their values
  var options = [
    { text: "Redirect", value: "Redirect" },
    { text: "Partial", value: "Partial" },
    { text: "Student Journey", value: "Student Journey" },
    { text: "DIQ", value: "DIQ" },
    { text: "Paid Search", value: "Paid Search" }
  ];

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
    var input = document.querySelector("#list-search");
    input.value = selectedOption;

    // Find the button with ID "btn-filter" and trigger a click event
    var filterButton = document.querySelector("#btn-filter");
    filterButton.click();
  });

  // Insert the select element into the container
  container.appendChild(select);
}






// Run the function when the page finishes loading
addStyleToWrappingTrElements();
// deleteVisibleMdLgElements();