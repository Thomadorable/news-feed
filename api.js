var select = document.getElementById('news-selector');
var results = document.getElementById('main');
var urlSources = 'https://newsapi.org/v2/sources?apiKey=2c21eeea68b24e06ad5a37a06735fbc5';
var req = new Request(urlSources);
fetch(req).then(function (response) {
    return response.json().then(function (json) {
        for (var index = 0; index < json.sources.length; index++) {
            var source = json.sources[index];
            select.innerHTML += '<option value="' + source.id + '">' + source.name +
                '</option>';
        }
    });
})

select.addEventListener('change', function () {
    var url = 'https://newsapi.org/v2/top-headlines?' +
        'sources=' + this.value + '&' +
        'apiKey=2c21eeea68b24e06ad5a37a06735fbc5';
    var req = new Request(url);
    fetch(req).then(function (response) {
        return response.json().then(function (json) {
            results.innerHTML = '';
            for (var index = 0; index < json.articles.length; index++) {
                var article = json.articles[index];
                results.innerHTML += '<article><figure><figcaption><h2>' + article.title + '</h2></figcaption><img src="' + article.urlToImage + '" alt="Image de l\'article de :TechCrunch"></figure><p>' + article.description + '</p><a href="' + article.url + '" target="_blank" class="cta" rel="noreferrer">Lire la suite</a> </article>';
            }
        });
    })
});