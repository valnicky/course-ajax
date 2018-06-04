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
    imgRequest.setRequestHeader('Authorization', 'Client-ID baa689cb580d70deccc9408da47bd6c775850737e46ba0ccee6ebe9ef5cacce0');    
    imgRequest.send();


	const searchedForText = 'hippos';
	const articleRequest = new XMLHttpRequest();
	articleRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
	articleRequest.onload = addArticles;
	articleRequest.onerror = function (err) {
		requestError(err, 'articles');
	}
	articleRequest.setRequestHeader('Authorization', 'Client-ID d5bc16eb1d774a15bea3170d7d577517 ');
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

/*function addArticles () {
	const articleRequest = new XMLHttpRequest();
	articleRequest.onload = addArticles;
	articleRequest.oneerror = function(err) {
		requestError(arr, 'articles');
	}
	articleRequest.open('GET', `http://api.nytimes.com/svc/serch/v2/articlesearch.json?q=${searchedForText}
		&api-key=d5bc16eb1d774a15bea3170d7d577517`);
	articleRequest.send();
}*/

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
	
}




    });

})();


