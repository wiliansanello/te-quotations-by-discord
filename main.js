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
        const res = await getEvents()
        let objQuot = []
        let message = res.map((register) => {            
            let quotDate = register.LastUpdate.substring(8,10)+'/'
                            +register.LastUpdate.substring(5,7)
                            +'/'+register.LastUpdate.substring(0,4)
            objQuot.push({
                quotation_date: quotDate, 
                country: register.Country, 
                category: register.Category,
                value: register.Value
            })
            return objQuot
        })
        message.map((attr, index)=>{
        msg.channel.send(`__Dados da Cotação__ 
            Data Atualização **${attr[index].quotation_date}**  
            País: **${attr[index].country}** 
            Categoria: **${attr[index].category}**
            Valor: **${attr[index].value}**
            Fonte: https://tradingeconomics.com/api/indicators.aspx?country=mexico`)      
         })
    }     
})

client.login(process.env.TOKEN)
