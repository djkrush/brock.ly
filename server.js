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

app.get('/rss', function (req, res) {
  // Only get the latest posts
  var posts = poet.helpers.getPosts(0, 1);
  res.setHeader('Content-Type', 'application/rss+xml');
  res.render('rss', { posts: posts });
});

app.get('/sitemap.xml', function (req, res) {
  // Only get the latest posts
  var postCount = poet.helpers.getPostCount();
  var posts = poet.helpers.getPosts(0, postCount);
  res.setHeader('Content-Type', 'application/xml');
  res.render('sitemap', { posts: posts });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
