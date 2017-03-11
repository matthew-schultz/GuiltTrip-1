var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var serv = require("http").Server(app);
var schedule = require('node-schedule');


// make app use the `bodyParser()` middleware for all routes
// app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req,res){
	res.sendFile(__dirname+'/client/index.html');
});

//  info route
// app.get('/visitor', function(req, res){
//   res.sendFile(__dirname+'/visitor/visitor.html');
// });

// superUser  route
// app.get('/admin', function(req, res){
//   res.sendFile(__dirname+'/admin/admin.html');
// });

// json test route
app.get('/jsonTest', function(req, res){
  res.sendFile(__dirname+'/jsonTest/jsonTest.html');
});

// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
app.post('/', function(req, res){

  var userValues = req.body.values;
  var otherUserValues = req.body.moreValues;
  var litersPerGallon = 3.78541/1;
  var miliPerLiter = 1000/1;
  var octanePercentage = 9/10;
  var ethanolPercentage = 1/10;
  var densityOfOctane = .702;
  var gramsOfOctane;
  var treeConsumptionDay = .13;
  var treeConsumptionMonthly = 4;
  var densityOfEthanol = .7892;
  var carbonEthanol = 88.018/46.0688;
  var carbonOctane = 704.144/228.462;
  var oneKiloGram = 1000;
  var onePound = 2.0246;
  var totalGramsCarbonEthanol = userValues * (1/otherUserValues) * litersPerGallon * miliPerLiter * 
    ethanolPercentage * densityOfEthanol ;
  var totalGramsCarbonOctane = userValues * (1/otherUserValues) * litersPerGallon * miliPerLiter * 
  octanePercentage * densityOfOctane ; 
  var emissionEthanol = totalGramsCarbonEthanol * carbonEthanol ;
  var emissionOctane = totalGramsCarbonOctane * carbonOctane;
  var emissionTotal = emissionEthanol + emissionOctane;
  var emissionPounds = emissionTotal /oneKiloGram / onePound;
  var yourTreeAteOneDay = emissionPounds / treeConsumptionDay;
  var yourTreeAteMonth = emissionPounds/ treeConsumptionMonthly;



  var html = 'your user values: ' + emissionPounds + '.<br>' +
             'your other user values  <br>' + yourTreeAteOneDay + '<br>'+ 
             '<a href="/">Try again.</a>';



  res.send(html);
});

app.use('/client',express.static(__dirname + '/client'));
serv.listen(process.env.PORT || 3000);
	console.log("Server Started on port 3000");


