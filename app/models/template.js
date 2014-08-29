templates = [{"a" : "1"}]

exports.getTemplates = function() {
	return templates;
}

exports.createTemplate = function(endpoint, content, contentType) {
	var template = {
		"endpoint" : endpoint,
		"content" : content,
		"contentType" : contentType
	}

	templates.push(template)
}

function getTemplate(endpoint) {
	// loop through templates and lookup endpoint
}

function setParameters(endpoint, params) {
	// set parameters for an endpoint
}

