const fs = require('fs');
const qrcode = require('qrcode-terminal');
const {Client} = require('whatsapp-web.js');
const SESSION_FILE_PATH = './session.json';
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}
const client = new Client({
    session: sessionData
});
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});
client.on('qr', qr => {
	qrcode.generate(qr, {small: true});
});
client.on('ready', () => {
	console.log('El cliente esta listo');
})
client.on('message', message => {
	console.log(message.body);
});
client.on('message', message => {
	if(message.body === '!ayuda') {
		message.reply('Hola! Soy Jumanji tu bot de confianza y cada dia el de mas gente. Aqui te dejo un listado de comandos que puedes ejecutar:\
        \n\n1. !ayuda\n2. !condiciones\n3. !saludo\n4. !sticker\n5. Por el culo te la hinco\n6. !final\n7. !version\n8. !extra');
	}
    else if(message.body === '!version')
        message.reply('Version actual: 8.0')
    else if(message.body === '!condiciones') {
        message.reply('No me hago cargo del mal uso que se le pueda dar al bot. \
        \nSu uso es unico y exclusivo para aprender como funciona y divertirse. Usando el bot estas aceptando todo lo dicho anteriormente.')
    }
    else if(message.body === '!saludo')
        message.reply('Hola mundo!!')
    else if(message.body === '!final')
        message.reply('Probablente a principios de Noviembre dejare de funcionar. \nAsi que disfrutad de mi mientras dure :D')
    else if(message.body === '!extra')
        message.reply('Hermano que hambre, decidle a Pablo que me ponga un campero')
    else if(message.body === 'Por el culo te la hinco')
        message.reply('JAJAJAJA')

});
client.on('message', async msg => {
	if(msg.body === "!sticker" && msg.hasMedia){
		const mediaData = await msg.downloadMedia()
		msg.reply(mediaData, null, {
			sendMediaAsSticker: true
		})
    }
    else if(msg.body === '!sticker')
        msg.reply('Si quieres un sticker, mandame una foto y en el mensaje escribe !sticker')
});
client.initialize();

// client.on('message', message => {
// 	if(message.body === '!ping') {
// 		message.reply('pong');
// 	}
// });