const searchOptions = document.querySelector('.search-options');
const originInputContainer = document.querySelector('#default-input');
const originInput = document.querySelector('#origin-input');
const originInputIcon = originInput.parentElement.querySelector('.fas');
const destinationInput = document.querySelector('#destination-input');
const conditionalInputs = document.querySelectorAll('.search-input.conditional');
const tripSeparators = document.querySelectorAll('.trip-separator');

var currentLocation = {};

/**
 * Make options appear when typing in the field
 */
originInput.addEventListener('keyup', e => {
    displayMoreSearchOptions();
});

/**
 * Display more options when user starts to type
 */
const displayMoreSearchOptions = () => {
    displaySeparators();
    displayDestinationInput();
    displaySearchOptions();
}

/**
 * Get current location
 */
const getCurrentLocation = () => {
    if(navigator.geolocation) {
        // timeout at 60000 milliseconds (60 seconds)
        var options = {timeout:60000};
        console.log('ok');
        navigator.geolocation.getCurrentPosition(position => {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            document.querySelector('#search-direction').setAttribute('data-lat', pos.lat);
            document.querySelector('#search-direction').setAttribute('data-lng', pos.lng);
            return pos;
        });
    } else{
        alert("Sorry, browser does not support geolocation!");
    }
}

/**
 * Set current location
 */
const setOriginAsCurrentLocation = () => {
    // Text
    originInput.value = 'Current location';
    // Style
    originInputContainer.classList.add('blue');
    originInput.setAttribute('disabled', 'disabled');
    originInputIcon.classList.remove('fa-search');
    originInputIcon.classList.add('fa-map-marker-alt');
    // Google Map API
    // 1. Get current location
    getCurrentLocation();
    // 2. Request GMAP for a JSON on current position
}

/**
 * Display destination input
 */
const displayDestinationInput = () => {
    conditionalInputs.forEach(input => {
        if(!input.classList.contains('visible') && input.classList.contains('destination-input')) {
            input.classList.add('visible');
        }
    });
}

/**
 * Display Search Options
 */
const displaySearchOptions = () => {
    if(!searchOptions.classList.contains('visible')) {
        searchOptions.classList.add('visible');
    }
}

/**
 * Display separators
 */
const displaySeparators = () => {
    tripSeparators.forEach(separator => {
        if(!separator.classList.contains('visible')) {
            separator.classList.add('visible');
        }
    });
}

/**
 * Use current location
 */
document.querySelector('#choose-current-location').addEventListener('click', e => {
    e.target.style.display = 'none';
    destinationInput.focus();
    setOriginAsCurrentLocation();
    displayMoreSearchOptions();
});
