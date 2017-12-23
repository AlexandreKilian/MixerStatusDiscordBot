const fetch = require('node-fetch');
const Carina = require('carina').Carina;
const ws = require('ws');
const merge = require('merge');

Carina.WebSocket = ws;


const messageStart = (channelInfo) => {
    return `We're live playing ${channelInfo.type.game} on Mixer! Join the fun at <https://mixer.com/${channelInfo.token}>!`
};

const messageEnd = (channelInfo) => {
    return `Stream is over.`
};

const defaultOptions = {
    notifyOnStart: true,
    notifyOnEnd: false,
    messageStart: messageStart,
    messageEnd: messageEnd
};

class MixerDiscordBot{
    constructor(config, options = {}){
        this.config = config;

        this.options = merge(defaultOptions, options);
        this.readyFn = () => {};
    }

    ready(fn){
        this.readyFn = fn;
    }

    start() {
        this.ca = new Carina({ isBot: true }).open();
        this.loadInfo().then(this.subscibe);
    }

    loadInfo(){
        const infourl = `https://mixer.com/api/v1/channels/${this.config.channelId}`;
        return fetch(infourl).then((data) => {
            return data.json()
        }).then((data) => {
            this.channelInfo = data;
            this.readyFn();
        });
    }
    subscribe() {
        this.ca.subscribe(`channel:${this.config.channelId}:update`, data => {
            if(data.online){
                this.notifyOnStart();
            } else {
                this.notifyOnEnd();
            }
        });

    }

    postToDiscord(message){
        const body = {'content': message};
        fetch(this.config.webhook, {
            method: 'POST', headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    notifyOnStart(){
        if(this.options.notifyOnStart){
            const message = this.options.messageStart(this.channelInfo);
            this.postToDiscord(message);
        }
    }
    notifyOnEnd(){
        if(this.options.notifyOnEnd){
            const message = this.options.messageEnd(this.channelInfo);
            this.postToDiscord(message);
        }
    }
}


module.exports = MixerDiscordBot;
