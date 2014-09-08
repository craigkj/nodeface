var templates = []

getTemplates = function() {
	return templates;
}
exports.getTemplates = getTemplates;

createTemplate = function(endpoint, content, contentType) {
	var template = {
		'endpoint' : endpoint,
		'content' : content,
		'contentType' : contentType,
		'parameters' : ""
	}
	templates.push(template)
}

// Find first matching endpoint in list of templates
findTemplate = function(endpoint) {
	console.log("Looking for " + endpoint)

	for (var i = 0; i < templates.length; i++) {
		if(templates[i].endpoint === endpoint ){
			console.log(endpoint + " found");
			return templates[i];
		}
	}

	console.log(endpoint + " not found")
	return {}
}
exports.findTemplate = findTemplate;

// Add dynamic parameters to the template
setParameters = function(endpoint, params) {
	var template = findTemplate(endpoint);

	if(template.length > 1) {
			template.parameters = params
			// remove the old template from the array
			// add the new one in its place... need to research this
	}
}
exports.setParameters = setParameters;

// Parse post body for a template
parsePostBody = function(body) {
	if (typeof body != 'undefined'){
		if(body.endpoint && body.content && body.contentType) {
			createTemplate(body.endpoint, body.content, body.contentType);
		}else{
			console.log('Template could not be constructed, one element is undefined: ' + 'endpoint ' + body.endpoint + ' content: ' + body.content + ' contentType: ' + body.contentType)
		}
	}else{
		console.log('Request body is undefined: ' + body)
	}
}
exports.parsePostBody = parsePostBody;
