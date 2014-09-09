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

	for (var i = 0; i < templates.length; i++) {
		if(templates[i].endpoint === endpoint ){
			return templates[i];
		}
	}
	return {}
}
exports.findTemplate = findTemplate;

setParameters = function(endpoint, params) {
	var template = findTemplate(endpoint);
	template.parameters = params;
}
exports.setParameters = setParameters;

getParameters = function(endpoint) {
	var template = findTemplate(endpoint);
	return template.parameters
}
exports.getParameters = getParameters

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
