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
    imgRequest.setRequestHeader('Authorization', 'Client-ID 462d22cae6dd1d4877bb082c9e9c6502893a9bb730');    
    imgRequest.send();




const searchedForText = 'hippos';
const unsplashRequest = new XMLHttpRequest();

unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
unsplashRequest.onload = addImage;

unsplashRequest.setRequestHeader('Authorization', 'Client-ID <your-client-id>');
unsplashRequest.send();

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
	const articleRequest = new XMLHttpRequest();
	articleRequest.onload = addArticles;
	articleRequest.oneerror = function(err) {
		requestError(arr, 'articles');
	}
	articleRequest.open('GET', `http://api.nytimes.com/svc/serch/v2/articlesearch.json?q=${searchedForText}
		&api-key=<your-API-key-goes-here>`);
	articleRequest.send();
}

function addArticles2 () {
	let htmlContent = '';
	const data = JSON.parse(this.responseText);

	if (data.response && data.response.docs && data.response.docs.length > 1) {
		
		  const article = data.response.docs.map.article;
            htmlContent = '<ul>' + `<li class="article">
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
            </li>`
            + '</ul>';
			} else {
				htmlContent = '<div class = "error-no-articles">No articles available</div>';
			}


			responseContainer.insertAdjacentHTML('beforeend', htmlContent);
}

    });

})();


