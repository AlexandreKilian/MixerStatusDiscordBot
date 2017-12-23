#Mixer Status Discord bot

This node bot allows to post mixer.com status updates to a discord channel using webhooks.

## 1. Installation

To install the latest version

```sh
yarn add mixerstatus-discordbot
```


## 2. Usage

Import the class and configure

```js 
    const MixerDiscordBot = require('./index');
    const config = {
        channelId: 000,
        webhook: 'https://discordapp.com/api/webhooks/XX/YYY'
    };

    const botInstance = new MixerDiscordBot(config);

    botInstance.start();
```


### 2.1 Config and Options

The bot has two parameter objects, config (required) and options (optional)

#### Config

| Key | Value | Required|
|-----|-------|-------------|
| channelId | Mixer Channel ID | YES |
| webhook | Discord Webhook URL | YES |

#### Options

| Key | Value | Required | Description | Default |
|-----|-------|----------|-------------| ---------|
| notifyOnStart | boolean | NO | Should a message be posted on stream start? | `true` |
| notifyOnEnd | boolean | NO | Should a message be posted on stream end? | `false` |
| messageStart | function | NO | Returns function to be posted on start, gets full channel info as parameter | `We're live playing ${channelInfo.type.game} on Mixer! Join the fun at <https://mixer.com/${channelInfo.token}>!` |
| messageEnd | function | NO | Returns function to be posted on end, gets full channel info as parameter | `Stream is over.`|
