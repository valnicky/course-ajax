(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

    fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    	headers: {
        	Authorization: 'Client-ID c365e98e5d2a4134a09c4ebe259be3bf49b5081e8ee932cdf29db4a8a1053faa'
    }
}).then(response => response.json())
.then(addImage)
.catch(e => requestError(e, 'image'));

function addImage(data) {
	let htmlContent = '';
	const firstImage = data.results[0];

	if(firstImage) {
		htmlContent = `<figure>
		<img src="${firstImage.urls.small}" alt="${searchedForText}">
		<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
		</figure>`;
	} else {
		htmlContent = 'Unfortunately, no image was returned for your search.'
	}

	responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}

function requestError(e, part) {
    console.log(e);
    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}


fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=d5bc16eb1d774a15bea3170d7d577517`,{
	headers: {
		Authorization: 'Client-ID d5bc16eb1d774a15bea3170d7d577517'
	}
}) 
.then(response => response.json())
.then(addArticles)
.catch(err => requestError(err, 'articles'));
    });

function addArticles (data) {
	let htmlContent = '';

	if (data.response && data.response.docs && data.response.docs.length > 1) {
		const articles = data.response.docs;
		htmlContent = '<ul>' + articles.map(article => `<li class="article">
			<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
			<p>${article.snippet}</p>
			</li>`)
		.join('') + '</ul>';
	} else {
		htmlContent = '<div class="error-no-articles">No articles available</div>';
	}
	responseContainer.insertAdjacentHTML('beforeend', htmlContent);
}

})();
