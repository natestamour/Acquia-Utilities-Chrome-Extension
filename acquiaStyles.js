////////////////////////////////////////////////////
// Acquia Style Changes for Organization

// ! WIP

function addStyleToWrappingTrElements() {
  var aTags = document.getElementsByTagName('a');

  console.log ("executing acquiastyles.js");

  for (var i = 0; i < aTags.length; i++) {
    if (aTags[i].textContent.includes('DIQ;')) {
      var trElement = aTags[i].closest('tr');
      if (trElement) {
        trElement.style.borderLeft = '10px solid blue';
      }
    }
  }
}

// Run the function when the page finishes loading
addStyleToWrappingTrElements();


// document.addEventListener('DOMContentLoaded', function() {
//   var isACS = false;
//   var iconPath = document.querySelector('link[rel="icon"]').getAttribute('href');
//   var iconSearch = ['maestro.mautic.com/storage/branding', '/media/acquia/logo-campaignstudio-ico.png'];


//   if (iconPath) {
//     for (var i = 0; i < iconSearch.length; i++) {
//       if (iconPath.indexOf(iconSearch[i]) >= 0) {
//         isACS = true;
//       }
//     }
//   }

//   // Background code to run on any acquia page
//   if (isACS) {
//     // Check for <a> tags containing "DIQ;"
//     var aTags = document.getElementsByTagName('a');
//     for (var j = 0; j < aTags.length; j++) {
//       if (aTags[j].textContent.includes('DIQ;')) {
//         // Find the wrapping <tr> element
//         var trElement = aTags[j].closest('tr');
//         if (trElement) {
//           trElement.style.borderLeft = '10px solid blue';
//         }
//       }
//     }
//   }
// });