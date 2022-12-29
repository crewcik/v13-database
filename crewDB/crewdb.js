const fs = require('fs')

class DB {
    constructor() {

    }

    yaz(veri, değer) {
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        dosya[veri] = değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
    }

    bul(veri) {
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        if (!dosya[veri]) return;
        return dosya[veri]
    }

    kontrol(veri) {
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        return dosya[veri] ?  true : false
    }

    sil(veri) {
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        if (!dosya[veri]) return;
        delete dosya[veri]
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
    }

    yedekle(dosyaAdı) {
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        return fs.writeFileSync(`${dosyaAdı}.json`, JSON.stringify(dosya, null, 2))
    }

    topla(veri, değer) {
        if (typeof değer !== 'number') return;
        if (!this.kontrol(veri)) return
        if (typeof this.bul(veri) !== 'number') return
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        dosya[veri] += değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
    }

    çıkar(veri, değer) {
        if (typeof değer !== 'number') return
        if (!this.kontrol(veri)) return
        if (typeof this.bul(veri) !== 'number') return
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        dosya[veri] -= değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
    }
}

module.exports = new DB()