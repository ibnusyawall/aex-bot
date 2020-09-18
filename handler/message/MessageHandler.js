const  {
    MessageMedia
} = require('whatsapp-web.js')

const {
    groupList,
    otherList,
    countList,
    donasi
} = require('./../../lib/util/Menu')

const {
    Ytdl,
    Igdl,
    Resi,
    Wiki,
    Gtts,
    Toxic,
    About,
    Quotes,
    QrMaker,
    Brainly,
    Jsholat,
    Primbon,
    Translate,
    Animhentai
} = require('./../../lib/index')

const {
    generateQuotesDefault,
    generateQuotes
} = require('./../../lib/util/Gquotes')

const {
    insert,
    countHit,
    countUsers,
    statCommand
} = require('./../../database/index')

var moment = require('moment-timezone')
var fs = require('fs')

const MessageHandler = async (client_, msg_) => {
    try {
        const chat  = await msg_.getChat()
        const users = await msg_.getContact()
        const { type, from, to, author, timestamp, mentionedIds } = msg_
        let { body } = msg_

        function replace(text) {
            return text.replace('@c.us', '')
        }

        const dari = typeof author === 'undefined' ? from : author
        const name = typeof users.pushname === 'undefined' ? users.verifiedName : users.pushname
        const prefix = '!' || '#' || ''

        const istimer = (ts) => moment.duration(moment() - moment(timestamp * 1000)).asSeconds()

        const args   = body.slice(prefix.length).trim().split(/ +/);
        const argv   = body.slice(prefix.length).trim().split(/ +/);
        const text   = args.splice(1).join(' ')
        const number = text.indexOf('62') === -1 ? text.replace('0', '62') + '@c.us' : text
        const isadmin = chat.participants.filter(no => no.id._serialized === author)[0].isAdmin === true ? true : false

        const krisarNumber = '6282299265151@c.us'  // pliese don't delete this variable.

        insert(author, type, text, name, from, 'unknown')

        switch (args[0]) {
                case 'setName':
                    if (chat.isGroup) {
                        if (isadmin) chat.setSubject(text)
                        insert(author, type, text, name, from, 'setName')
                          .then(x => console.log('[:] DB has Insert'))
                          .catch(err => console.log(err))
                    }
                    break;
                case 'setDesc':
                    if (chat.isGroup) {
                        if (isadmin) chat.setDescription(text)
                        insert(author, type, text, name, from, 'setDesc')
                          .then(x => console.log('[:] DB has Insert'))
                          .catch(err => console.log(err))
                    }
                    break;
                case 'promote':
                    if (chat.isGroup) {
                        if (isadmin) chat.promoteParticipants([mentionedIds[0]])
                        insert(author, type, text, name, from, 'promote')
                          .then(x => console.log('[:] DB has Insert'))
                          .catch(err => console.log(err))
                    }
                    break;
                case 'demote':
                    if (chat.isGroup) {
                        if (isadmin) chat.demoteParticipants([mentionedIds[0]])
                        insert(author, type, text, name, from, 'demote')
                          .then(x => console.log('[:] DB has Insert'))
                          .catch(err => console.log(err))
                    }
                    break;
                case 'add':
                    if (chat.isGroup) {
                        if (isadmin) chat.addParticipants([text])
                        insert(author, type, text, name, from, 'add')
                          .then(x => console.log('[:] DB has Insert'))
                          .catch(err => console.log(err))
                    }
                    break;
                case 'kick':
                    if (chat.isGroup) {
                        if (isadmin) chat.removeParticipants([mentionedIds[0]])
                        insert(author, type, text, name, from, 'kick')
                          .then(x => console.log('[:] DB has Insert'))
                          .catch(err => console.log(err))
                    }
                    break;
                case 'kickme':
                    if (chat.isGroup) {
                        if (isadmin) chat.leave()
                        insert(author, type, text, name, from, 'kickme')
                          .then(x => console.log('[:] DB has Insert'))
                          .catch(err => console.log(err))
                    }
                    break;
                case 'kickall':
                    if (chat.isGroup) {
                        if (isadmin) {
                            let msg = ''
                            let mentions = []
                            for (let participant of chat.participants) {
                                msg += `${participant.id.user} `;
                                chat.removeParticipants(msg.split(' '))
                            }
                        }
                        insert(author, type, text, name, from, 'kickall')
                          .then(x => console.log('[:] DB has Insert'))
                          .catch(err => console.log(err))
                    }
                    break;
                case 'admin':
                    if (chat.isGroup) {
                        const data = chat.participants.filter(admin => admin.isAdmin === true)
                        let msg = `Halo ${name}!\n\nAdmin of *${chat.name}* Groups:\n\n`
                        let mentions = []
                                data.map( async x => {
                                    let contact = await client_.getContactById(x.id._serialized)
                                    msg += `@{x.id.user} \n`
                                    mentions.push(contact)
                                })

                                chat.sendMessage(msg, { mentions })
                    }
                    insert(author, type, text, name, from, 'admin')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'getall':
                    if (chat.isGroup) {
                        if (isadmin) {
                            let msg = `Groups: *${chat.name}* \nMembers: ${chat.participants.length} orang.\n\n`
                            let mentions = []
                            for (let participant of chat.participants) {
                                const contact = await client_.getContactById(participant.id._serialized)
                                let i = 1
                                mentions.push(contact);
                                msg += `@${participant.id.user} \n`;
                            }
                            chat.sendMessage(msg, { mentions });
                        }
                    }
                    insert(author, type, text, name, from, 'getall')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'menu':
                    let menu = `Halo @${users.number}!. \n\nJoin US AEX-BOT Group: https://chat.whatsapp.com/DBHTdnFW7bD45FwfdIGZHI\n\nBerikut menu dari *AEX-BOT WHATSAPP* :\n\n`

                    groupList('!').then(grub => {
                        grub.map(({ command, description }) => {
                            menu += `*Group Command:*\n\n${command}\n${description}\n\n`
                        })
                        otherList('!').then(other => {
                            other.map(({ command, description }) => {
                                menu += `\n*Other Command:*\n\n${command}\n${description}\n`
                            })
                            chat.sendMessage(menu, {mentions: [users]})
                        })
                    })
                    insert(author, type, text, name, from, 'menu')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'about':
                    About(name).then(about => {
                        client_.sendMessage(from, about)
                    })
                    insert(author, type, text, name, from, 'about')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'quotes':
                    Quotes().then(quotes => {
                        chat.sendMessage(`Quotes request by @${users.number},\n\nQuotes :\n\n " *${quotes}* " `, {
                            mentions: [users]
                        })
                    })
                    insert(author, type, text, name, from, 'quotes')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'toxic':
                    Toxic().then(toxic => {
                        client_.sendMessage(from, toxic)
                    })
                    insert(author, type, text, name, from, 'toxic')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'translate':
                    if (msg_.hasQuotedMsg) {
                        let quotedMsg = await msg_.getQuotedMessage()
                        if (!argv[1]) {
                            msg_.reply('❌ Masukan kode bahasa.')
                        } else if (argv[2] == 'voice') {
                            Translate(quotedMsg.body, argv[1])
                                .then(data => {
                                    var tts = require('node-gtts')(argv[1])

                                    tts.save(process.cwd() + '/translate.ogg', data, async () => {
                                        let media = await MessageMedia.fromFilePath(process.cwd() + '/translate.ogg')

                                        chat.sendMessage(media, { sendAudioAsVoice: true })
                                    })
                                })
                                .catch(err => console.log(err))
                        } else {
                            Translate(quotedMsg.body, argv[1])
                                .then(data => {
                                    msg_.reply(data)
                                })
                                .catch(err => console.log(err))
                        }
                    }
                    insert(author, type, text, name, from, 'translate')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'qr':
                    QrMaker(text).then(result => {
                        msg_.reply(new MessageMedia('image/jpeg', result, 'qrcode'))
                    })
                    insert(author, type, text, name, from, 'qr')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'quotesmaker':
                    const attachmentData = await msg_.downloadMedia()

                    if (!argv[1]) msg_.reply('argv invalid.')

                    if (type == 'image') {
                        fs.writeFile(process.cwd() + '/quotesClient.jpg', attachmentData.data, 'base64', (err) => {
                            try {
                                generateQuotes(process.cwd() + '/quotesClient.jpg', argv.splice(1).join(' '))
                                  .then(data => {
                                      msg_.reply(new MessageMedia('image/jpeg', data, 'quotes'))
                                  })
                            } catch (err) {
                                client_.sendMessage(from, 'error parse data.')
                            }
                        })
                    } else {
                        generateQuotesDefault(argv.splice(1).join(' ')).then(data => {
                            msg_.reply(new MessageMedia('image/jpeg', data, 'quotes'))
                        })
                    }
                    insert(author, type, text, name, from, 'quotesmaker')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'tts':
                    switch (argv[1]) {
                        case 'id':
                            Gtts('id', argv.splice(2).join(' ')).then(data => {
                                msg_.reply(new MessageMedia('audio/mp3', data, 'tts'))
                            })
                            break;
                        case 'en':
                            Gtts('en', argv.splice(2).join(' ')).then(data => {
                                msg_.reply(new MessageMedia('audio/mp3', data, 'tts'))
                            })
                            break;
                        default:
                            client_.sendMessage(from, 'piilih bahasa: \n\n*id* untuk bahasa indonesia \n*en* untuk bahasa inggris')
                            break;
                    }
                    insert(author, type, text, name, from, 'tts')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'ytmp3':
                    let isLink = text.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

                    if (isLink !== null) {
                        msg_.reply('File akan segera kami proses, harap bersabar.')
                        Ytdl('mp3', text).then(data => {
                            data.map(({ audiobase64 }) => {
                                msg_.reply(new MessageMedia('audio/mp3', audiobase64, 'ytmp3'))
                            })
                        })
                    } else {
                        msg_.reply('link atau url tidak valid.')
                    }
                    insert(author, type, text, name, from, 'ytmp3')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'ytmp4':
                    let isLinks = text.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

                    if (isLinks !== null) {
                        msg_.reply('File akan segera kami proses, harap bersabar.')
                        Ytdl('mp4', text).then(data => {
                            data.map(({ title, duration, videobase64 }) => {
                              let ytmp4 = `YT MP4 DOWNLOADER\n\n*${title}* [${duration}]\n\nTiming: ${istimer()}`

                              client_.sendMessage(from, new MessageMedia('video/mp4', videobase64, 'ytmp4'), {
                                  caption: ytmp4
                              })
                            })
                        })
                    } else {
                        msg_.reply('link atau url tidak valid.')
                    }
                    insert(author, type, text, name, from, 'ytmp4')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'brainly':
                    let msg = `Halo ${name} 👋. Berikut hasil pencarian dari: *${text}* \n\n`
                    Brainly(text).then(result => {
                        let i = 1
                        result.map(({ title, url }) => {
                            msg += `${i++}. ${title}\nKlik Disini: ${url}\n\n`
                        })
                        msg_.reply(msg)
                    })
                    insert(author, type, text, name, from, 'brainly')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'botjoin':
                    const inviteCode = argv[1].replace('https://chat.whatsapp.com/', '')
                    if (argv[1].match(/(https:)/gi)) {
                        try {
                            await client_.acceptInvite(inviteCode);
                            msg_.reply('🍻 Terimakasih, bot akan segera masuk!.');
                        } catch (e) {
                            msg_.reply('🔐 Sepertinya link group telah dibatalkan.');
                        }
                    } else {
                       msg_.reply('❌ Link group tidak valid (revoke).')
                    }
                    insert(author, type, text, name, from, 'botjoin')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'js':
                    Jsholat(text)
                        .then(data => {
                            data.map(({isya, subuh, dzuhur, ashar, maghrib, terbit}) => {
                                var x  = subuh.split(':'); y = terbit.split(':')
                                var xy = x[0] - y[0]; yx = x[1] - y[1]
                                let perbandingan = `${xy < 0 ? Math.abs(xy) : xy}jam ${yx< 0 ? Math.abs(yx) : yx}menit`
                                let msg = `Jadwal Sholat untuk ${text} dan Sekitarnya ( *${tanggal}* )\n\nDzuhur : ${dzuhur}\nAshar  : ${ashar}\nMaghrib: ${maghrib}\nIsya       : ${isya}\nSubuh   : ${subuh}\n\nDiperkirakan matahari akan terbit pada pukul ${terbit} dengan jeda dari subuh sekitar ${perbandingan}\n\n\nFetch from: https://api.banghasan.com/`
                                msg_.reply(msg)
                            })
                        })
                        .catch(err => msg_.reply(err))
                        insert(author, type, text, name, from, 'js')
                            .then(x => console.log('[:] DB has Insert'))
                            .catch(err => console.log(err))
                    break;
                case 'igdl':
                    Igdl(text)
                        .then(resp => {
                            const { author, type, like, link, data } = resp
                            if (type == 'image') {
                                let msg = `IG IMAGE DOWNLOADER by (aex-bot)\n\n${author} [${like} likes]\n\nLink: ${link}`

                                client_.sendMessage(from, new MessageMedia('image/jpeg', data, 'aex-bot'), {
                                    caption: msg
                                })
                            } else {
                                let msg = `IG VIDEO DOWNLOADER by (aex-bot)\n\n${author} [${like} likes]\n\nLink: ${link}`

                                client_.sendMessage(from, new MessageMedia('video/mp4', data, 'aex-bot'), {
                                    caption: msg
                                })
                            }
                        }).catch(err => msg_.reply(err))
                        insert(author, type, text, name, from, 'igdl')
                            .then(x => console.log('[:] DB has Insert'))
                            .catch(err => console.log(err))
                    break;
                case 'wiki':
                    Wiki(text)
                        .then(data => {
                            msg_.reply(data.data)
                         })
                        .catch(err => msg_.reply(err))
                    insert(author, type, text, name, from, 'wiki')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'sial':
                    Primbon('sial', text).then(resp => {
                        const { title, data } = resp

                        msg_.reply(`${title}\n\n${data}`)
                    })
                    insert(author, type, text, name, from, 'sial')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'jodoh':
                    Primbon('jodoh', text).then(resp => {
                        const { title, data } = resp

                        msg_.reply(`${title}\n\n${data}`)
                    })
                    insert(author, type, text, name, from, 'jodoh')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'artinama':
                    Primbon('artinama', text).then(resp => {
                        const { title, data } = resp

                        msg_.reply(`${title}\n\n${data}`)
                    })
                    insert(author, type, text, name, from, 'artinama')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'sifat':
                    Primbon('sifat', text).then(resp => {
                        const { title, data } = resp

                        msg_.reply(`${title}\n\n${data}`)
                    })
                    insert(author, type, text, name, from, 'sifat')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'jnt':
                    Resi('jnt', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    insert(author, type, text, name, from, 'jnt')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'lex':
                    Resi('lex', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    insert(author, type, text, name, from, 'lex')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'lion':
                    Resi('lion', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    insert(author, type, text, name, from, 'lion')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'sicepat':
                    Resi('sicepat', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    insert(author, type, text, name, from, 'sicepat')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'pos':
                    Resi('pos', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    insert(author, type, text, name, from, 'pos')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'tiki':
                    Resi('tiki', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    insert(author, type, text, name, from, 'tiki')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'anteraja':
                    Resi('anteraja', text).then(data => {
                        msg_.reply(data)
                    }).catch((err) => {
                        msg_.reply(err)
                    })
                    insert(author, type, text, name, from, 'anteraja')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'randomnime':
                    Animhentai('anim').then(data => {
                        msg_.reply(new MessageMedia('image/jpeg', data.data, 'aex-bot'))
                    })
                    insert(author, type, text, name, from, 'randomnime')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'randomhentai':
                    Animhentai('hentai').then(data => {
                        msg_.reply(new MessageMedia('image/jpeg', data.data, 'aex-bot'))
                    })
                    insert(author, type, text, name, from, 'randomhentai')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;

                case 'donasi':
                    donasi(name).then(data => {
                        msg_.reply(data)
                    })
                    insert(author, type, text, name, from, 'donasi')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'hit':
                    countHit.then(data => {
                        msg_.reply(`Total Hit saat ini: ${data}x`)
                    })
                    insert(author, type, text, name, from, 'hit')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'countme':
                    countUsers(from).then(data => {
                        msg_.reply(`Nama: ${name}\nTotal Hit: ${data}x\n\nEnjoy!`)
                    })
                    insert(author, type, text, name, from, 'countme')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
                case 'stat':
                    statCommand(text).then(data => {
                        msg_.reply(`Command: *${text}*\nTotal Penggunaan: *${data}x*`)
                    })
                    insert(author, type, text, name, from, 'stat')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;


                case 'krisar':
                    client_.sendMessage(from, 'kritik dan saran dikirimkan.')
                    client_.sendMessage(krisarNumber, `[krisar] From: ${from}\n\n${text}`)
                    break;
                case 'ping':
                    client_.sendMessage(from, `Pong! ⏳ ${istimer()}s`)
                    insert(author, type, text, name, from, 'ping')
                        .then(x => console.log('[:] DB has Insert'))
                        .catch(err => console.log(err))
                    break;
        }
        console.log(msg_)
    } catch (err) {
        console.log(err)
    }
}

module.exports = MessageHandler
