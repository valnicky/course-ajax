(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

    const imgRequest = new XMLHttpRequest();
    imgRequest.onload = addImage;
    imgRequest.onerror = function(err) {
    	requestError(err, 'image');
    };
    imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    imgRequest.setRequestHeader('Authorization', 'Client-ID c365e98e5d2a4134a09c4ebe259be3bf49b5081e8ee932cdf29db4a8a1053faa');    
    imgRequest.send();

	const articleRequest = new XMLHttpRequest();
	articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}`);
	articleRequest.onload = addArticles;
	articleRequest.onerror = function (err) {
		requestError(err, 'articles');
	}
	articleRequest.setRequestHeader('Authorization', 'Client-ID d5bc16eb1d774a15bea3170d7d577517');
	articleRequest.send();

function addImage(){
	let htmlContent = '';
	const data = JSON.parse(this.responseText);

	if(data && data.results && data.results[0]){
		const firstImage = data.results[0];

		htmlContent = `<figure> 
				<img src="${firstImage.urls.regular}" 
				alt ="${searchedForText}">
				<figcaption>${searchedForText} by ${firstImage.user.name}
				</figcaption>
				</figure>`;
	} else {
		htmlContent = '<div class= "error-no-image">No images available</div>';
	}
	responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

}

function addArticles () {
	let htmlContent = '';
	const data = JSON.parse(this.responseText);

	if (data.response && data.response.docs && data.response.docs.length > 1) {
		
		  const article = data.response.docs.map.article;
            htmlContent = '<ul>' + data.response.docs.map(article  => `<li class="article">
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
            </li>`
            ).join('')
            + '</ul>';
			} else {
				htmlContent = '<div class = "error-no-articles">No articles available</div>';
			}

			responseContainer.insertAdjacentHTML('beforeend', htmlContent);
}

function requestError (e, part) {
	console.log(e);
	 responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}

    });

})();


