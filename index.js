var irc = require('irc');

module.exports.server=function(serv){
  this.irc=new irc.Client(this.settings.server, this.settings.nick, {
    channels: [this.settings.chan],
    password: this.settings.pass,
    secure:true
  });
  this.irc.nick=this.settings.nick;
  this.irc._updateMaxLineLength();
  this.irc.addListener('message', function (from, to, message) {
    serv.broadcast("[irc] "+from+": "+message);
  });
  if(this.settings.startingMessage) this.irc.say(this.settings.chan, this.settings.startingMessage);
  this.irc.addListener('error', function(message) {
    console.log('error: ', message);
  });
};

module.exports.player=function(player,serv)
{
  var self=this;
   player.on('chat',function(data){
     self.irc.say(self.settings.chan, "[mc] "+player.username+": "+data.message);
   });

  player.on("connected",function() {self.irc.say(self.settings.chan, player.username + ' connected')});
  player.on("disconnected",function() { self.irc.say(self.settings.chan, player.username + ' disconnected')});
};

