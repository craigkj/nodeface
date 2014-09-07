// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app = exports.app = express(); 				// define our app using express
var bodyParser = require('body-parser');
var templateManager   = require('./app/models/template');

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
		res.json(templateManager.getTemplates())
	})
	.post(function(req, res, next) {
		templateManager.parsePostBody(req.body);
		console.log(req);
  		res.json('posting a template');
	});

// Testing only. REMOVE
router.route('/createTemplate')
	.get(function(req, res) {
		templateManager.createTemplate('testing', 'This is some content', 'text/plain');
		res.json(templateManager.getTemplates());
	});

// get a template by its endpoint
router.route('/:endpoint')
	.get(function(req, res) {
		var template = templateManager.findTemplate(req.url.substring(1))
		res.json(template.content)
	});

// set params on an endpoint
router.route('/params/:endpoint')
	.get(function(req, res) {
		res.json("TODO")
	});


app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('nodeface is mocking on port: ' + port);

// TODO LIST

// Add basic tests for the above - Mocha, Karma and ... ?
// POST on create template
// Save to local file? - Interface for s3/db/other file storage
// add params to templates
// get with params
// ignore params in template match
