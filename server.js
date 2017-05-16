const express = require ('express');
const hbs = require ('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine','hbs');
app.use((req, res, next) => {
  var now = Date().toString();
  var log = now+': '+req.method+'('+req.url+')';
  console.log(log);
  fs.appendFile('./log/log.txt',log+'\n', (err) => {
    if(err) {
      console.log('no access to log-file (',now,')');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitel: 'MAINTENANCE',
//     welcomeMessage: 'this site is in maintenance mode - please visit us later on',
//   });
// });

app.use(express.static(__dirname + '/public'));

app.get(('/'), (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to the web-server-tutorial',
  });
});

app.get(('/about'), (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
});

app.get(('/bad'), (req, res) => {
  res.send({errorMessage: 'unable to fulfil this request'});
});

app.listen(3000, () => {
  console.log('Server is up on Port 3000');
});
