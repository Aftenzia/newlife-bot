const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {

  let temps = (args.splice(0).join(' '));
  
  const tempete_embed = new MessageEmbed()
  .setColor('#EB33FF')
	.setTitle(':cloud_tornado: | **ANNONCE REDEMARRAGE**')
	.setThumbnail('https://i.imgur.com/KVgDfMP.png')
  .setDescription("Le serveur va proccéder à un redémarrage ! \n Celui-ci arrivera  dans " + `**${temps}**` +" minutes ! \n \n  Veuillez vous déconnecter et attendre le **GO** avant de vous reconnecter.")
	.setTimestamp()
  .setFooter('© NEWLIFE');
  
  // let log_channel = client.channels.cache.get('785476405201862667') // LOG DEV
  let log_channel = client.channels.cache.get('769090337288486922') //LOG NEWLIFE - TCHAT GENERAL HRP
  log_channel.send(tempete_embed);

  //return message.channel.send(tempete_embed);

}; 

module.exports.help = {
  name: "tempete",
  aliases: ['tempete', 'temp', 'storm', 'restart'],
  description:"Annonce une tempête",
  cooldown: 10,
  usage: '<temps>',
  isUserAdmin: true,
  permissions: true,
  args: true
};
