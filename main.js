const { Client, Collection, GuildMember } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const { readdirSync } = require("fs");
const { time } = require('console');

const client = new Client();
// client.commands, client.cooldowns
["commands", "cooldowns"].forEach(x => client[x] = new Collection());

const loadCommands = (dir = "./commands/") => { // Recherche des différents fichiers .JS (sous dossier)
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`Commande chargée: ${getFileName.help.name}`);
    };
  });
};

loadCommands(); // Initialisation des commandes.

client.on('message', message => {
  if (!message.content.toLowerCase().startsWith(PREFIX) || message.author.bot) return; // Insensibilité "char"

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const user = message.mentions.users.first();
  //console.log();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  if (!command) return;

  //if (command.help.isUserAdmin && message.guild.member(message.mentions.users.first()).hasPermission('BAN_MEMBERS')) return message.reply("tu ne peux pas utiliser cette commande sur cet utilisateur.");

  //if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("tu n'as pas la permission nécessaire pour faire cette commande.");

  if (command.help.permissions && !message.member.hasPermission('KICK_MEMBERS'))
    return message.reply("bien essayé... Mais tu n'as pas la permission."); //fix le probleme de crash discord avec .ban .kick
  if (command.help.args && !args.length) { // HELP utilisation de la commande (texte dans le fichier .js)
    let noArgsReply = `${message.author} pour utiliser cette commande, vous devez insérer un texte !`;

    if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande : \`${PREFIX}${command.help.name} ${command.help.usage}\``

    return message.channel.send(noArgsReply);
  };

  if (command.help.isUserAdmin && !user) return message.reply('il faut mentionner un utilisateur.');

  if (command.help.isUserAdmin && message.guild.member(user).hasPermission('BAN_MEMBERS') ) 
    return message.reply('tu ne peux pas utiliser cette commande sur cet utilisateur.');

  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  }

  const timeNow = Date.now(); // L'heure à laquelle le message est envoyé.
  const tStamps = client.cooldowns.get(command.help.name); 
  const cdAmount = (command.help.cooldowns || 5) * 1000; // Conversion S en M. (help)

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.reply(`Veuillez attendre ${timeLeft.toFixed(0)} secondes avant de réutiliser la commande \`${command.help.name}\`.`); // Temps restant avant la prochaine utilisation de la commande.
    }
  }

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount); // Active le cooldown du dernier utilisateur ayant utiliser la commande.

  command.run(client, message, args);
});

client.on('ready', () => console.log(`${client.user.tag} à démarré avec succès !`))
//client.login(TOKEN); // Token enregistré dans => config.js


client.login(process.env.TOKEN);