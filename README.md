<div style="text-align: center;" align="center">

# egg-plugin-xml

An eggjs plugin for parsing xml

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

## Install

```bash
# use pnpm
$ pnpm install egg-plugin-xml

# use npm
$ npm install egg-plugin-xml --save

# use yarn
$ yarn add egg-plugin-xml
```

## Usage

```js
// {app_root}/config/plugin.js
exports.xmlParser = {
    enable: true,
    package: 'egg-plugin-xml'
}
```

## Configuration

egg-plugin-xml support all configurations in [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js).

### eg. Do not always put child nodes in an array

```js
// {app_root}/config/config.default.js
exports.xmlParser = {
    limit: '2mb',
    encoding: 'utf8',
    key: 'body',
    xmlOptions: {
        explicitArray: false
    }
}
```

## Extends

```js
// {app_root}/app/extend/helper.js
const { helper } = ctx

helper.parserXML()
helper.getXMLBody()
```

## Change logs

[更新日志](./CHANGELOG.md)

## Questions & Suggestions

Please open an issue [here](https://github.com/saqqdy/egg-plugin-xml/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/egg-plugin-xml.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-plugin-xml
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/egg-plugin-xml/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/egg-plugin-xml&utm_campaign=Badge_Grade
[snyk-image]: https://snyk.io/test/npm/egg-plugin-xml/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-plugin-xml
[download-image]: https://img.shields.io/npm/dm/egg-plugin-xml.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-plugin-xml
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_egg-plugin-xml
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_egg-plugin-xml
