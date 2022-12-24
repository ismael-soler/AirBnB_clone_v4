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

    // API AVAILABILITY
    apiAvailabilityCheck();

    // PLACES FUNCTION
    postPlaces();
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

  function apiAvailabilityCheck () {
    const api_status = document.getElementById('api_status');
    fetch('http://localhost:5001/api/v1/status/')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          api_status.classList.add('available');
        } else {
          api_status.classList.remove('available');
        }
      });
  }

  function postPlaces () {
    const section = document.querySelector('section.places');
    fetch('http://localhost:5001/api/v1/places_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({key: 'value'})
    })
      .then(response => response.json())
      .then(data => {
        for (place of data) {
          section.innerHTML += `
          <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? "s" : ""}</div>
                      <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? "s" : ""}</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? "s" : ""}</div>
              </div>
                    <div class="description">
                ${place.description}
                    </div>
            </article>
          `;
        }
      })
      .catch(error => console.log(error));
  }
