const MixerDiscordBot = require('./index');

const channelId = 81996;
const webhook = 'https://discordapp.com/api/webhooks/394168920426414081/vv0vQPANVFbgCGhk_k8voz10RSMq5Cd8_Kv2l1bKDVvzE8S-TYw7uUzdsrEnV8_Dj7US';
const config = { channelId, webhook };
const bot = new MixerDiscordBot(config);

bot.ready(() => {
    console.log('bot is running');
})
bot.start();