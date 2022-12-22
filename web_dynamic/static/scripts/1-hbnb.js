window.onload = function () {
  // CHECKBOXES LOADING
  const checkboxesArray = Array.from(document.getElementsByClassName('checkbox'));
  var amenitiesChecked = [];

  // MAIN CODE HERE
  checkboxesArray.forEach((checkbox, i) => {
    checkbox.addEventListener('change', () => {
      var amenityName = checkbox.getAttribute('data-name');

      if (checkbox.checked) {
        // adds to the array
        amenitiesChecked.push(amenityName);
        modifyHTML(amenitiesChecked);
      } else {
        // removes from the array
        amenitiesChecked.splice(amenitiesChecked.indexOf(amenityName), 1);
        modifyHTML(amenitiesChecked);
      }
    });
  });
};

function modifyHTML (amenitiesChecked) {
  // TEXT LOADING
  const selectedAmenitiesString = Array.from(document.getElementsByClassName('selectedAmenities'));
  if (amenitiesChecked) {
    selectedAmenitiesString[0].innerHTML = amenitiesChecked.join(', ');
  } else {
    selectedAmenitiesString[0].innerHTML = '&nbsp;';
  }
}
