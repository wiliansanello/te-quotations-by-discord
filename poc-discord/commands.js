import { DiscordRequest } from './utils.js'

const HasGuildCommands = async(appId, guildId, commands) => {
    if (guildId === '' || appId === '') return

    commands.forEach((c) => HasGuildCommand(appId, guildId, c))
}

 const HasGuildCommand = async (appId, guildId, command) => {
    const endpoint = `applications/${appId}/guilds/${guildId}/commands`

    try{
        const res = await DiscordRequest(endpoint, {method: 'GET'})
        const data = await res.json()

        if (data) {
            const installedNames = data.map((c) => c['name'])

            if(!installedNames.includes(command['name'])){
                console.log(`Installing "${command['name']}"`)
                InstallGuildCommand(appId, guildId, command)
            } else {
                console.log(`"${command['name']}" command already installed`)
            }
        }
    } catch (err){
        console.log(err)
    }
}

const InstallGuildCommand = async (appId, guildId, command) => {
    const endpoint = `applications/${appId}/guilds/${guildId}/commands`
    try {
        await DiscordRequest(endpoint, {method: 'POST', body: command})
    } catch (err) {
        console.log(err)
    }
}

const TEST_COMMAND = {
    name: 'test',
    description: 'Testing 123',
    type: 1,
}

export {HasGuildCommands, TEST_COMMAND}
