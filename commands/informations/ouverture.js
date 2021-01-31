const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {

  let text = (args.splice(0).join(' '));

  const tempete_embed = new MessageEmbed()
  .setColor('#EB33FF')
	.setTitle(':cloud_tornado: | **ANNONCE NEWLIFE**')
	.setThumbnail('https://i.imgur.com/KVgDfMP.png')
  //.setDescription("Notre métérologue a détecté une tempête tropicale ! \n Celle-ci arrivera  d'ici " + `**${temps}**` + " minutes ! Mettez-vous à couvert et déconnectez-vous.")
  //.addField('**Listes des touches :**', `${text}`, true)
  .setTimestamp()
  .setFooter('© NEWLIFE');
  
  let log_channel = client.channels.cache.get('785476405201862667')
  log_channel.send(tempete_embed);
}; 

module.exports.help = {
  name: "ouverture",
  aliases: ['ouverture', 'ouverture', 'ouverture'],
  description:"annonce",
  cooldown: 10,
  usage: '@utilisateur raison',
  isUserAdmin: true,
  permissions: true,
  args: true
};