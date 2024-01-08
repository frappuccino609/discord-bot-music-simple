const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const { prefix, token } = require('./config.json'); // Ubah file ini sesuai dengan konfigurasi bot

const queue = new Map();

client.once('ready', () => {
  console.log('Bot musik siap!');
});

client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);
  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel) {
    return message.channel.send('Kamu harus bergabung dengan channel voice terlebih dahulu!');
  }

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    // Implementasi kode untuk perintah play
    // ...
  } else if (command === 'skip') {
    // Implementasi kode untuk perintah skip
    // ...
  } else if (command === 'stop') {
    // Implementasi kode untuk perintah stop
    // ...
  }
  // Tambahan perintah lainnya jika diperlukan
});

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Memainkan sekarang: **${song.title}**`);
}

client.login(token);
