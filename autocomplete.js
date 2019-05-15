function makeInputAutocomplete(inputId = undefined) {
	if (inputId !== undefined) {
		// Get input as DOM Element
		var DOMElement = document.getElementById(inputId);
		const autocompleteInput = new google.maps.places.Autocomplete(DOMElement);

		return (autocompleteInput);
	}

	return (undefined);
}