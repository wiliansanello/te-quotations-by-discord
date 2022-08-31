require('dotenv/config')
const Discord = require('discord.js')
const fetch = require('node-fetch')
const client = new Discord.Client()

const keyWords = ['cotacao', 'cotação']

async function getEvents() {
    const res =  await fetch(`
            https://api.tradingeconomics.com/historical/country/mexico/indicator/gdp?c=guest:guest&f=json
        `)
    const data = await res.json()
       
    return data
}


client.on('ready', ()=> {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
    if (msg.author.bot) return

    if(keyWords.some(word => msg.content.includes(word))){
        const ret = await getEvents()
        const quotDate = ret[0].LastUpdate.substring(8,10)+'/'+ret[0].LastUpdate.substring(5,7)+'/'+ret[0].LastUpdate.substring(0,4)
        const message = [quotDate, ret[0].Country, ret[0].Category, ret[0].Value]
        msg.channel.send(`__Dados da Cotação__ 
            Data Atualização **${message[0]}**  
            País: **${message[1]}** 
            Categoria: **${message[2]}**
            Valor: **${message[3]}**
            Fonte: https://tradingeconomics.com/api/indicators.aspx?country=mexico`) 
        console.log(message)
    }
    
})

client.login(process.env.TOKEN)
