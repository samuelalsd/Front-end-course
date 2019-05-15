function addError(HTMLElementId = undefined) {
    if (HTMLElementId) {
        // get HTML element if HTMLElementId exists
        const elem = $(`#${HTMLElementId}`);
        //if exists then add error
        if (elem) {
            elem.addClass('is-invalid');
        }
    }
}

function removeError(HTMLElementId = undefined) {
    if (HTMLElementId) {
        // get HTML element if HTMLElementId exists
        const elem = $(`#${HTMLElementId}`);
        //if exists then remove error
        if (elem) {
            elem.removeClass('is-invalid');
        }
    }
}