const debug = require('debug')('app:siteControllers')
const path = require('path')

exports.index = (req, res) => {
  debug('Site index requested, sending home.html')
  return res.sendFile(path.resolve('./public/home.html'));
}

exports.logo = (req, res) => {
  return res.sendFile(path.resolve('./assets/logo-circle.png'))
}

exports.license = (req, res) => {
  debug('license requested, sending LICENSE')
  return res.sendFile(path.resolve('./LICENSE'))
}
