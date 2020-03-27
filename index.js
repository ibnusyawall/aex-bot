'use strict';

module.exports = {
    Client: require('./whatsapp-web.js/src/Client'),
    
    version: require('./whatsapp-web.js/package.json').version,

    // Structures
    Chat: require('./whatsapp-web.js/src/structures/Chat'),
    PrivateChat: require('./whatsapp-web.js/src/structures/PrivateChat'),
    GroupChat: require('./whatsapp-web.js/src/structures/GroupChat'),
    Message: require('./whatsapp-web.js/src/structures/Message'),
    MessageMedia: require('./whatsapp-web.js/src/structures/MessageMedia'),
    Contact: require('./whatsapp-web.js/src/structures/Contact'),
    PrivateContact: require('./whatsapp-web.js/src/structures/PrivateContact'),
    BusinessContact: require('./whatsapp-web.js/src/structures/BusinessContact'),
    ClientInfo: require('./whatsapp-web.js/src/structures/ClientInfo'),
    Location: require('./whatsapp-web.js/src/structures/Location')
};