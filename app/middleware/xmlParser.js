const { parseStringPromise } = require('xml2js')

function parse(request, options) {
	options = Object.assign(
		{
			limit: '1mb',
			encoding: 'utf8',
			xmlOptions: {}
		},
		options
	)
	const len = request.headers['content-length']
	if (len) {
		options.length = len
	}
	return raw(request, options).then(str => {
		return parseStringPromise(str, options.xmlOptions)
			.then(xml => {
				return {
					xml,
					rawBody: str
				}
			})
			.catch(err => {
				err = typeof err === 'string' ? new Error(err) : err
				err.status = 400
				err.body = str
				throw err
			})
	})
}

module.exports = options => {
	console.log(200, options)
	if (typeof options !== 'object') options = {}
	let mountKey = options.key || 'xml'
	return async function xmlParser(ctx, next) {
		if (ctx.request[mountKey] !== undefined) {
			console.warn(
				`ctx.request.${mountKey} is not undefined, please use ctx.request.xmlData to get the XML data`
			)
			mountKey = 'xmlData'
		}
		console.log(201, ctx.request.charset, ctx.request.rawBody, 202)
		// method is post/put/patch && type is xml (text/xml and application/xml)
		if (
			ctx.is('text/xml', 'xml') &&
			['post', 'put', 'patch'].includes(ctx.method.toLowerCase())
		) {
			// if (!options.encoding && ctx.request.charset) {
			// 	options.encoding = ctx.request.charset
			// }
			// return parse(ctx.req, options)
			// 	.then(result => {
			// 		ctx.request[mountKey] = result.jsonData
			// 		ctx.request.rawBody = result.rawBody
			// 		return next()
			// 	})
			// 	.catch(err => {
			// 		if (options.onerror) {
			// 			options.onerror(err, ctx)
			// 		}
			// 		// throw error by default
			// 		else {
			// 			throw err
			// 		}
			// 	})
			return next()
		}
		return next()
	}
}
