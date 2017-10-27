const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

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


// app.use((req,res,next)=>{
//   res.render('maintainance.hbs',{
//     pageTitle:'Not available',
//     head:'We will be back shortly',
//     text:'Sorry, the site is being updated and will be back shortly'
//   })
// })

app.use(express.static(__dirname + '/public'));

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

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:'Projects',
    head:'Projects',
    text:'This page has details of all my previous, current and up-coming projects'
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

app.listen(port,()=>{
  console.log(`Server up on Port ${port}`);
});
