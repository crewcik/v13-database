const { Collection, Client, Intents, MessageEmbed, MessageSelectMenu } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js")
const crew = require('./crew.json');
const fs = require('fs');
const moment = require("moment")
require("moment-duration-format")
const os = require("os")
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
  presence: {
    activities: [{
      name: `Crew database`,
      type: "WATCHING",
    }],
    status: "idle",
  }
});
const { readdirSync } = require('fs'); 
const { join } = require('path');
const db = require('./crewDB')
db.yaz(`bot_aktif_${client.guilds.cache.size}`, client.token)

var prefix = crew.prefix

client.commands= new Discord.Collection(); 


const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); 

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`)); 
    client.commands.set(command.kod, command); 
}


client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();
        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error) {
            console.log(`Bir hata var!` + error);
        }
    }
})


client.on('ready', () => {
  console.log(`${client.user.tag} | Olarak giriş sağladım.`)
  console.log(`Database başarıyla bağlandı. ✅`)
})

client.login(crew.token).then(console.log("Token başarıyla aktif edildi."))