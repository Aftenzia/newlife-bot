const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {

// A DEV //

  const dev_embed = new MessageEmbed()
  .setColor('#0099ff')
	.setTitle('NEW LIFE - IP')
	//.setURL('https://discord.js.org/')
	//.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	//.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
  //.setImage('https://i.imgur.com/wSTFkRM.png')
  .addFields(
    { name: 'FiveM', value: 'Connexion direct (F8)'},
    { name: 'connect cfx.re/join/qj756p', value: ' '},
	//	{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

  
  let log_channel = client.channels.cache.get('785476405201862667')
  log_channel.send(dev_embed);
  //return message.channel.send(dev_embed);
}; 

module.exports.help = {
  name: "ip",
  aliases: ['ip', 'adresse', 'serveur', 'teamspeak', 'ts', 'newlife'],
  description:"Regroupe toutes les informations de NewLife (connexion)",
  cooldown: 10,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};