'use strict'

const cli = require('heroku-cli-util')
const co = require('co')
const merge = require('../util/merge')

function * pull (context, heroku) {
  let config = yield heroku.get(`/apps/${context.app}/config-vars`)
  cli.debug(config)
  cli.debug(merge({a: 1}, {b: 2}, context.flags))
}

module.exports = {
  topic: 'config',
  command: 'mypull',
  description: 'pulls env variables from heroku',
  help: 'this is helpful?',
  needsApp: true,
  needsAuth: true,
  run: cli.command(co.wrap(pull)),
  flags: require('../util/flags')
}
