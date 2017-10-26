const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable to append to file');
    }
  });
  next();
})

app.use((req,res,next)=>{
  res.render('maintainance.hbs',{
    pageTitle:'Not available',
    head:'We will be back shortly',
    text:'Sorry, the site is being updated and will be back shortly'
  })
})
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
})

app.get('/',(req,res)=>{
  res.render('home',{
    pageTitle : 'Home page',
    head : 'HOME',
    text : 'Welcome to my webpage'
  })
})

app.get('/bad',(req,res)=>{
  res.send({
  Badrequest:'could not process request'
  }
  )
})

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle : 'About page',
    head: 'About',
    text: 'This page has information about the author'
  })
})

app.listen(3000,()=>{
  console.log('Server up on Port 3000');
});
