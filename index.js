var irc = require('irc');

module.exports.server=function(serv){
  var self=this;

  var client=serv.irc=new irc.Client(self.settings.server, self.settings.nick, {
    channels: [self.settings.chan],
    password: self.settings.pass,
    secure:true
  });
  this.irc=client;


  client.nick=self.settings.nick;

  client._updateMaxLineLength();

  client.addListener('message', function (from, to, message) {
    serv.broadcast("[irc] "+from+": "+message);
  });

  if(self.settings.startingMessage) client.say(self.settings.chan, self.settings.startingMessage);

  client.addListener('error', function(message) {
    console.log('error: ', message);
  });
};

module.exports.player=function(player,serv)
{
  var self=this;
  var client=self.irc;
   player.on('chat',function(message){
     client.say(self.settings.chan, "[minecraft] "+player.username+": "+message);
   })
};

