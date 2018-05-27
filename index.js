const irc = require('irc')

module.exports.server = function (serv) {
  this.irc = new irc.Client(this.settings.server, this.settings.nick, {
    channels: [this.settings.chan],
    password: this.settings.pass,
    secure: true
  })
  this.irc.nick = this.settings.nick
  this.irc._updateMaxLineLength()
  this.irc.addListener('message', (from, to, message) => serv.broadcast('[irc] ' + from + ': ' + message))
  if (this.settings.startingMessage) this.irc.say(this.settings.chan, this.settings.startingMessage)
  this.irc.addListener('error', message => console.log('error: ', message))
}

module.exports.player = function (player, serv) {
  const ircSay = (message) => this.irc.say(this.settings.chan, '[mc] ' + message)
  player.on('chat', ({message}) => ircSay(player.username + ': ' + message))
  player.on('connected', () => ircSay(player.username + ' connected'))
  player.on('disconnected', () => ircSay(player.username + ' disconnected'))
}
