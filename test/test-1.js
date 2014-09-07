
var templateManager = require('../app/models/template');
var app = require('../server').app;
var assert = require("assert")
var request = require('supertest'); 
var url = 'http://localhost:8081/';

// Ping the pages
describe('Ping Tests', function() {
	it('should return a 200 on root /', function (done) {
	   request(app)
	     .get('/')
	     .expect(200)
	     .end(function (err, res) {
	       	console.log(err);
	       	done();
	     });
	});
	it('should return a 200 on templates /templates', function (done) {
	   request(app)
	     .get('/templates')
	     .expect(200)
	     .end(function (err, res) {
	       	console.log(err);
	       	done();
	     });
	});
});

describe('Test Template Management', function() {

	it('should return an empty array', function() {
		var templates = templateManager.getTemplates();
		assert.equal(templates.length, 0);
	});

	it('should have a template when one is created', function() {
		templateManager.createTemplate();
		var templates = templateManager.getTemplates();
		assert.equal(templates.length, 1);
	});

	// Test the created template contents are correct
});

