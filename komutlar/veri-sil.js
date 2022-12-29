const ayar = require('../crew.json')
const Discord = require('discord.js')
const db = require('../crewDB')
const moment = require('moment')

moment.locale("tr")

module.exports = {
    kod: "veri-sil",
    async run (client, message, args) {
        if (message.author.id !== ayar.sahip) return message.reply(`Bu komutu kullanmak için developer değilsin.`)
        
        let veri_isim = args.slice(0).join(" ")
        if (!veri_isim) return message.reply(`Geçerli veri belirtin.`)

        let kontrol_et = db.bul(`${veri_isim}_${message.guild.id}`)
        if (!kontrol_et) return message.reply(`Veri tabanında **${veri_isim}** adlı veri bulunamadı.`)

        db.sil(`${veri_isim}_${message.guild.id}`)

        const embed = new Discord.MessageEmbed()
        .setDescription(`Başarıyla **${veri_isim}** isimli veri tabanından silindi.`)
        .setColor('GREEN')
        .setFooter('Crew bot')
        message.reply({ embeds : [embed] })

        let veri_durum = db.bul(`${veri_isim}_${message.guild.id}`)

        // Veri topu yeşil ise veri hâlâ duruyor. Kırmızı ise veri silinmiş.
        const crew_log = new Discord.MessageEmbed()
        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.avatarURL({ dynamic : true })}`, url: `https://github.com/CrewLua`}) 
        .setDescription(`
        \`©\` Silinen veri : **${veri_isim}_${message.guild.id}**
        \`©\` Silinme tarihi : **${moment(Date.now()).format("LLL")}**
        \`©\` Veri durumu : ${veri_durum ? "🟢" : "🔴"} 
        `)
        .setColor('DARK_BUT_NOT_BLACK')
        .setFooter('Crew bot log')
        .setTitle('Veri Silme')
        client.channels.cache.get(ayar.log).send({ embeds : [crew_log] })
    }
}

// Crew#0057 Tarafından kodlandı.