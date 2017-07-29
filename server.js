var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cookie_check.html'));
});

app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'homepage.html'));
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'register.html'));
});

app.get('/feed', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'feed.html'));
});

app.get('/publish', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'publishpage.html'));
});

app.get('/my_events', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'viewmypublish.html'));
});

app.get('/logout', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logout.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/feed.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'feed.css'));
});

app.get('/assets/bg.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/assets', 'bg.png'));
});
//req main.js
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/publish.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'publish.js'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`BJ's local Host on port ${port}!`);
});
