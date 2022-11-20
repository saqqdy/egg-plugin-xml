const { parseStringPromise } = require('xml2js')
const rawBody = require('raw-body')

module.exports = {
	/**
	 * parse xml
	 *
	 * @param {Object} rawBody xml string
	 * @param {Object} options xml2js options
	 * @return {Promise<object>} result { xml, rawBody }
	 */
	async parseXML(rawBody, options) {
		return await parseStringPromise(rawBody, options)
			.then(xml => ({
				xml,
				rawBody
			}))
			.catch(err => {
				err = typeof err === 'string' ? new Error(err) : err
				err.status = 400
				err.body = rawBody
				throw err
			})
	},

	/**
	 * parse xml
	 *
	 * @param {Object}  request ctx.req
	 * @param {Object}  options xmlParse options
	 * @return {Promise<object>} result { xml, rawBody }
	 */
	async getXMLBody(request, options) {
		options = Object.assign(
			{
				limit: '2mb',
				encoding: 'utf8',
				xmlOptions: {}
			},
			options
		)
		const len = request.headers['content-length']
		if (len) options.length = len

		const raw = await rawBody(request, options)
		return await this.parseXML(raw, options.xmlOptions)
	}
}
