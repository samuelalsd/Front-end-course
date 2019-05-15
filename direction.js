async function findDirection() {
    $('#form-error').text('');

    // get origin and destination from the autocomplete widget
    // Here we get a Google Place object
    const positions = {
        origin: window.originAutocomplete.getPlace(),
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
            } else {
                $('#form-error').text('no results found');
            }
        });
    } else {
        addError('origin-input');
        addError('destination-input');
    }
}