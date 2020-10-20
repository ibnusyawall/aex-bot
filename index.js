require('dotenv').config()
const { create, Client } = require('@open-wa/wa-automate')
const { options } = require('./lib/utils/options')
const MessageHandler = require('./handler')

const start = (client = new Client()) => {

    client.onStateChanged((state) => {
        console.log('[+] Client State:', state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
    })

    client.onMessage((message) => {
        client.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 3000) {
                    client.cutMsgCache()
                }
            })
        MessageHandler(client, message)
    })

    client.onAddedToGroup(({ groupMetadata: { id }, contact: { name } }) =>
        client.getGroupMembersId(id)
            .then((ids) => {
                console.log(`[+] Invited to Group. [ ${name} : ${ids.length}]`)
                let _id = id.split('-')
                let msg = `Thanks for adding us.\n\n-----\n\nGroup Name: *${name}*\nId: *${_id[1].split('@')[0]}*\nOwner: @${_id[0]}\n\n-----\nregards: *aex-bot*`
                client.sendTextWithMentions(id, msg)
            }))

    client.onIncomingCall((callData) => {
        client.contactBlock(callData.peerJid)
    })
}

create('aex-bot', options(false, start))
    .then((client) => start(client))
    .catch((err) => new Error(err))
