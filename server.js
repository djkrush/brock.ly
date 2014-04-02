var express = require('express');
var app = express();
Poet = require('poet');

var poet = Poet(app, {
  posts: './_posts/',
  postsPerPage: 5,
  metaFormat: 'json'
});

poet.init().then(function () {
  // ready to go!
});

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'));
app.use(app.router);

app.use(express.logger('dev'))

app.get('/', function (req, res) {
	res.render('index', {})
})

app.get('/posts', function (req, res) {
	res.render('posts', {})
})

app.get('/about', function (req, res) {
	res.render('about', {})
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
