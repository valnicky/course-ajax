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
    		Authorization: 'Client-ID c365e98e5d2a4134a09c4ebe259be3bf49b5081e8ee932cdf29db4a8a1053faa'
    	}
    }).done(addImage)
    .fail(function(err) {
    	requestError(err, 'image');
    });

     $.ajax({
        url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=d5bc16eb1d774a15bea3170d7d577517`,
        headers: {
            Authorization: 'Client-ID d5bc16eb1d774a15bea3170d7d577517'
        }
    }).done(addArticles)
    .fail(function(err) {
        requestError(err, 'article');
    });

    });

function addImage(data) {
    let htmlContent = '';

    if(data && data.results && data.results.length > 1) {
        const firstImage = data.results[0];//converted to js obj
    htmlContent =  `<figure>
        <img src="${firstImage.urls.regular}" alt="${searchedForText}">
        <figcaption>"${searchedForText}" by "${firstImage.user.name}" </figcaption>
       </figure>`;
    } else {
        htmlContent = '<div class= "error-no-image">No image available</diV>';
    }
    
    responseContainer.insertAdjacentHTML('afterBegin',htmlContent);
}

function addArticles (data) {
    let htmlContent= '';

    //const firstArticle = articles.results[0];

    if (data.response && data.response.docs && data.response.docs.length > 1) {

            htmlContent = '<ul>' + data.response.docs.map(article  => `<li class="article">
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
            </li>`
            ).join('') + '</ul>';
        } else {
                htmlContent = '<div class = "error-no-articles">No articles available</div>';
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
}

function requestError(e, part) {
    console.log(e);
    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}

})();
