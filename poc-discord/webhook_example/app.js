import 'dotenv/config'
import express from 'express'
import { InteractionType, InteractionResponseType } from 'discord-interactions'
import { HasGuildCommands, TEST_COMMAND } from './commands.js'
import { VerifyDiscordRequest } from '../utils.js'

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}))

app.post('/interactions', async function (req, res) {
    const { type, id, data } = req.body 

    if (type === InteractionType.APPLICATION_COMMAND){
        const { name } = data

        if (name === 'running'){
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: 'Test Integration With Trading Economics'
                }
            })
        }
    }
})

app.listen(PORT, ()=> {
    console.log('Listening on port ', 3000)
    HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, [
        TEST_COMMAND
    ])
})