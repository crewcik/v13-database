const ayar = require('../crew.json')
const Discord = require('discord.js')
const db = require('../crewDB')
const moment = require('moment')

moment.locale("tr")

module.exports = {
    kod: "veri-yaz",
    async run (client, message, args) {
        if (message.author.id !== ayar.sahip) return message.reply(`Bu komutu kullanmak için developer değilsin.`)

        let veri_isim = args.slice(0).join(" ")
        if (!veri_isim) return message.reply(`Bir veri ismi belirtin; 
        ✅ : ${ayar.prefix}veri-yaz kayitsiz_rol
        ❎ : ${ayar.prefix}veri-yaz kayıtsız rol
        `)

        db.yaz(`${veri_isim}_${message.guild.id}`, veri_isim)
        
        const veri_yazildi = new Discord.MessageEmbed()
        .setDescription(`**${veri_isim}** adında veri oluşturuldu.`)
        .setColor('GREEN')
        .setFooter('Crew bot')
        message.reply({ embeds : [veri_yazildi] })

        let veri_durum = db.bul(`${veri_isim}_${message.guild.id}`)

        // Veri topu yeşil ise veri hâlâ duruyor. Kırmızı ise veri silinmiş.
        const crew_log = new Discord.MessageEmbed()
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.avatarURL({ dynamic : true })}`, url: `https://github.com/CrewLua`}) 
        .setDescription(`
        \`©\` Yazılan veri : **${veri_isim}_${message.guild.id}**
        \`©\` Yazılma tarihi : **${moment(Date.now()).format("LLL")}**
        \`©\` Veri durumu : ${veri_durum ? "🟢" : "🔴"} 
        `)
        .setColor('DARK_BUT_NOT_BLACK')
        .setFooter('Crew bot log')
        .setTitle('Veri Yazma')
        client.channels.cache.get(ayar.log).send({ embeds : [crew_log] })
    }
}

// Crew#0057 Tarafından kodlandı.