/**
 * Show HTML elements to allow editing the trip
 */
const editTrip = () => {
    document.querySelector('#search-map').style.display = 'block';
    document.querySelector('#search-direction').style.display = 'block';
    document.querySelector('#edit-trip').style.display = 'none';
    document.querySelector('.search-options').style.paddingTop = '30px';
}

/**
 * Hide form after direction request
 */
const acceptUserSubmission = () => {
    document.querySelector('#search-map').style.display = 'none';
    document.querySelector('#search-direction').style.display = 'none';
    document.querySelector('#edit-trip').style.display = 'flex';
    document.querySelector('.search-options').style.paddingTop = 0;
}

async function findDirection() {
    $('#form-error').text('');

    const submitButton = document.querySelector('#search-direction');
    
    if(submitButton.hasAttribute('data-lat') && submitButton.hasAttribute('data-lng')) {
        const userOrigin = {
            lat: parseFloat(submitButton.getAttribute('data-lat')),
            lng: parseFloat(submitButton.getAttribute('data-lng'))
        };
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': userOrigin}, function(results, status) {
            if (status === 'OK') {
                queryForDirection(results[0]);
            }
        });
    } else {
        queryForDirection();
    }

}

const queryForDirection = (userOrigin = null) => {

    // get origin and destination from the autocomplete widget
    // Here we get a Google Place object
    const positions = {
        origin: userOrigin ? userOrigin : window.originAutocomplete.getPlace(),
        destination: window.destinationAutocomplete.getPlace(),
    };

    // get the string inside the input
    const originInputVal = $('#origin-input').val();
    const destinationInputVal = $('#destination-input').val();

    // reset error indicators on inputs
    removeError('origin-input');
    removeError('destination-input');

    // If the autocomplete widget has returned no result
    if (positions.origin === undefined) {
        // then we look if there is a string in the input
        if (_.isString(originInputVal) && originInputVal !== "") {
            // if yes, we use this input as reference
            positions.origin = originInputVal;
        } else {
            // if there is no result, or string, an error indicator is set on the input
            addError('origin-input');
        }
    } else {
        // if a result is returned by the autocomplete widget, the location of the place is retrieved
        positions.origin = {
            lat: positions.origin.geometry.location.lat(),
            lng: positions.origin.geometry.location.lng(),
        }
    }

    // If the autocomplete widget has returned no result
    if (positions.destination === undefined) {
        // then we look if there is a string in the input
        if (_.isString(destinationInputVal) && destinationInputVal !== "") {
            // if yes, we use this input as reference
            positions.destination = destinationInputVal;
        } else {
            // if there is no result, or string, an error indicator is set on the input
            addError('destination-input');
        }
    } else {
        // if a result is returned by the autocomplete widget, the location of the place is retrieved
        positions.destination = {
            lat: positions.destination.geometry.location.lat(),
            lng: positions.destination.geometry.location.lng(),
        }
    }

    // if both origin and destinations are set, then we look for a direction otherwise errors indicators are added
    if (positions.origin && positions.destination) {

        window.googleDirectionService.route({
            ...positions,
            travelMode: 'DRIVING',
        }, (result, status) => {
            console.log('status', status);
            if (status === 'OK') {
                window.googleDirectionRenderer.setDirections(result);
                acceptUserSubmission();
            } else {
                $('#form-error').text('no results found');
            }
        });
    } else {
        addError('origin-input');
        addError('destination-input');
    }
}

document.querySelector('#edit-trip').addEventListener('click', editTrip);
