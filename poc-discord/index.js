require ('dotenv/config')
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', ()=> {
    console.log('Online')
})

client.on('message', msg => {

})

client.login(process.env.TOKEN)