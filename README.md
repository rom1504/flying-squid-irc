# flying-squid-irc

Make a bridge between flying-squid (or dazed-sheep!) and an IRC channel.

## Usage

To use it : `npm install flying-squid-irc` in your flying-squid instance.
And then add something like this in your settings:
```json
 "flying-squid-irc": {
    "chan":"#PrismarineJS/flying-squid",
    "pass":"<take it from https://irc.gitter.im/>",
    "server":"irc.gitter.im",
    "nick":"<nick>",
    "startingMessage":"I live!"
  }
```

## History 

### 0.2.1
* add [mc] prefix to connection/disconnection

### 0.2.0
* add connection/disconnection notice

### 0.1.0
* improve irc messages a bit
* change according to flying-squid api

### 0.0.0

* works
