module.exports = app => {
	const index = app.config.coreMiddleware.indexOf('bodyParser')
	if (index === -1) app.config.coreMiddleware.push('xmlParser')
	else app.config.coreMiddleware.splice(index, 0, 'xmlParser')
}
