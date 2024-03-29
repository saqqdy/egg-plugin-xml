const { getProperty } = require('js-cool')

module.exports = options => {
	if (typeof options !== 'object') options = {}
	// like body or query.xml
	const propertyName = options.key || 'body'
	return async function xmlParser(ctx, next) {
		const { helper } = ctx
		if (getProperty(ctx.request, propertyName) !== undefined) {
			console.error(`[Error] ctx.request.${propertyName} is not undefined`)
			return await next()
		}
		// method is post/put/patch && type is xml (text/xml and application/xml)
		if (
			ctx.is('text/xml', 'xml') &&
			['post', 'put', 'patch'].includes(ctx.method.toLowerCase())
		) {
			if (!options.encoding && ctx.request.charset) {
				options.encoding = ctx.request.charset
			}
			// normalize tags
			if (options.normalizeTags) {
				const sep = typeof options.normalizeTags === 'string' ? options.normalizeTags : '_'
				if (!options.xmlOptions) options.xmlOptions = {}
				options.xmlOptions.tagNameProcessors = [
					name =>
						name
							.replace(/([A-Z]+)/g, sep + '$1')
							.replace(new RegExp('^' + sep), '')
							.toLocaleLowerCase()
				]
			}
			const { xml, rawBody } = await helper.getXMLBody(ctx.req, options)
			ctx.request[propertyName] = xml
			// setProperty(ctx.request, propertyName, xml)
			ctx.request.rawBody = rawBody
			return await next()
		}
		return await next()
	}
}
