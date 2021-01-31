const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {

  const test_embed = new MessageEmbed()
  .setColor('#bc28cc')
	.setTitle(':globe_with_meridians: **CONNEXION NEWLIFE**')
	.setThumbnail('https://i.imgur.com/KVgDfMP.png')
  //.setDescription('ceci est un test')
  .setTimestamp()
  .addField('**Adresse NewLife (FiveM)**', 'cfx.re/join/qj756p', false)
  .addField('**Adresse NewLife (FiveM) F8**', 'connect cfx.re/join/qj756p', false)
  .addField('**Adresse TeamSpeak**', 'ts3.newliferoleplay.net', false)
  .addField('**Site Internet** :tools: (WIP)', 'https://www.newliferoleplay.net', false)
  .setFooter('Bot développé par Aftenzia#7552');
  
  //let log_channel = client.channels.cache.get('785476405201862667')
  //log_channel.send(test_embed);
  return message.channel.send(test_embed);
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