// var path = require('path');
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.use(express.static('public'))

app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home') //We can omit the .handlebars extension as we do below
});

/* POST request: present info in h1 tag and table1 which contains name and value of URL query string*/
app.post('/home', function(req,res){
  // var context = {};
  var qParam2 = [];
  for (var p in req.body){
    console.log(p)
    qParam2.push({'name2': p, 'value2': req.body[p]})
  }

  // context.param2 = qParam2;

  var qParam1 = [];
  for (var k in req.query){
    qParam1.push({'name1': k, 'value1': req.query[k]})
  }

  // context.param = qParam2;

  res.render('page1', {'param': qParam1, 'param2': qParam2});
})


/* GET request: present info in h1 tag and table1 which contains name and value of URL query string*/
app.get('/home',function(req,res){
  var qParam = [];
  for (var k in req.query){
    qParam.push({'name3': k, 'value3': req.query[k]})
  }
  var context = {};
  context.param = qParam;
  console.log(context.param)
  res.render('page2', context) ;
})

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
