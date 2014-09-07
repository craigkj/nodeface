// global...? fix this.
templates = []

exports.getTemplates = function() {
	return templates;
}

createTemplate = function(endpoint, content, contentType) {
	var template = {
		'endpoint' : endpoint,
		'content' : content,
		'contentType' : contentType
	}

	templates.push(template)
}

// Find first matching endpoint in list of templates
exports.findTemplate = function(endpoint) {
	console.log("Looking for " + endpoint)

	for (var i = 0; i < templates.length; i++) {
		if(templates[i].endpoint === endpoint ){
			console.log(endpoint + "found");
			return templates[i];
		}
	}

	console.log(endpoint + "not found")
	return {}
}

exports.setParameters = function(endpoint, params) {
	// set parameters for an endpoint
}

// Parse post body for a template
exports.parsePostBody = function(body) {
	if (typeof body != 'undefined'){
		if(body.endpoint && body.content && body.contentType) {
			var endpoint = body.endpoint;
			var content = body.content;
			var contentType = body.contentType;
			createTemplate(endpoint, content, contentType);
		}else{
			console.log('Template could not be constructed, one element is undefined: ' + 'endpoint ' + body.endpoint + ' content: ' + body.content + ' contentType: ' + body.contentType)
		}
	}else{
		console.log('Request body is undefined: ' + body)
	}

}
