const ayar = require('../crew.json')
const Discord = require('discord.js')
const db = require('../crewDB')

module.exports = {
    kod: "veri-kontrol",
    async run (client, message, args) {
        if (message.author.id !== ayar.sahip) return message.reply(`Bu komutu kullanmak için developer değilsin.`)

        let veri_isim = args.slice(0).join(" ")
        if (!veri_isim) return message.reply(`Bir veri isimi belirtin.`)

        let kontrol = db.bul(`${veri_isim}_${message.guild.id}`)
        if (!kontrol) {
            const veri_yok = new Discord.MessageEmbed()
            .setDescription(`**${veri_isim}** isimli veri bulunamadı.`)
            .setColor('RED')
            .setFooter('Crew bot')
            message.reply({ embeds : [veri_yok] })
        } else {
            const veri_var = new Discord.MessageEmbed()
            .setDescription(`**${veri_isim}** isimli veri bulundu.`)
            .setColor('GREEN')
            .setFooter('Crew bot')
            message.reply({ embeds : [veri_var] })
        }
    }
}

// Crew#0057 Tarafından kodlandı.