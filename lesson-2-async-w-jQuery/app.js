/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

         $.ajax({
    	url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
    	headers: {
    		Authorization: 'Client-ID 462d22cae6dd1d4877bb082c9e9c6502893a9bb7305d4bf8f'
    	}
}).done(addImage)
    .fail(function(err) {
    	requestError(err, 'image');
    });

    });
})();
