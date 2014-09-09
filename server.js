// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app = exports.app = express(); 				// define our app using express
var bodyParser = require('body-parser');
var templateService   = require('./app/models/templateService');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8081; 		// set our port

// ROUTES
// =============================================================================
var router = express.Router(); // express router

// REGISTER OUR ROUTES -------------------------------

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	next(); // make sure we go to the next routes and don't stop here
});

// base root
router.get('/', function(req, res) {
	res.json({ message: 'nodeface is mocking your face' });
});

// get all templates and post new ones
router.route('/templates')
	.get(function(req, res) {
		res.json(templateService.getTemplates())
	})
	.post(function(req, res, next) {
		console.log(req.body);
		templateService.parsePostBody(req.body);
  		res.json('posting a template');
	});

// set params on an endpoint
router.route('/parameters/:endpoint')
	.get(function(req, res) {
		console.log('PARAMETERS');
		res.json(templateService.getParameters(req.params.endpoint))
	})
	.post(function(req, res, next) {
		console.log('PARAMETERS');
		templateService.setParameters(req.params.endpoint, req.body)
		res.json('Ok')
	});

// get a template by its endpoint
router.route('mock/*')
	.get(function(req, res) {
		console.log('ENDPOINT');
		var template = templateService.findTemplate(req.url.substring(1))
		res.json(template.content)
	});

app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('nodeface is mocking on port: ' + port);

// TODO LIST
// Template Object - specify this properly
// Template Repository - add as own file to handle pulling the template from memory or file or other
// ... could make an interface to be used for this.
// Save to local file? - Interface for s3/db/other file storage 5/10
// get with params (i.e use the parameters...) 5/10
// ignore params in template match 8/10
