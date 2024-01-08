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
    const songInfo = await ytdl.getInfo(args[0]);
    const song = {
      title: songInfo.title,
      url: songInfo.video_url,
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        const connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} telah ditambahkan ke antrian!`);
    }
  } else if (command === 'skip') {
    if (!message.member.voice.channel) {
      return message.channel.send('Anda harus bergabung dengan saluran suara terlebih dahulu!');
    }
    if (!serverQueue) {
      return message.channel.send('Tidak ada lagu yang dapat dilewati.');
    }
    serverQueue.connection.dispatcher.end();
    return message.channel.send('Lagu dilewati.');
  } else if (command === 'stop') {
    if (!message.member.voice.channel) {
      return message.channel.send('Anda harus bergabung dengan saluran suara terlebih dahulu!');
    }
    if (!serverQueue) {
      return message.channel.send('Tidak ada lagu yang dapat dihentikan.');
    }
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    return message.channel.send('Pemutaran dihentikan dan antrian dibersihkan.');
  } else if (command === 'queue') {
    if (!serverQueue || serverQueue.songs.length === 0) {
      return message.channel.send('Antrian kosong.');
    }
  
    const queueList = serverQueue.songs.map((song, index) => `${index + 1}. ${song.title}`).join('\n');
    return message.channel.send(`**Antrian Pemutaran:**
  ${queueList}`);
  } else if (command === 'volume') {
    const newVolume = parseInt(args[0]);
  
    if (isNaN(newVolume) || newVolume < 0 || newVolume > 10) {
      return message.channel.send('Volume harus berada di antara 0 dan 10.');
    }
  
    serverQueue.volume = newVolume;
    serverQueue.connection.dispatcher.setVolumeLogarithmic(newVolume / 5);
    return message.channel.send(`Volume diatur ke ${newVolume}.`);
  } else if (command === 'remove') {
    const indexToRemove = parseInt(args[0]);
  
    if (isNaN(indexToRemove) || indexToRemove < 1 || indexToRemove > serverQueue.songs.length) {
      return message.channel.send('Indeks lagu tidak valid.');
    }
  
    const removedSong = serverQueue.songs.splice(indexToRemove - 1, 1);
    return message.channel.send(`Lagu "${removedSong[0].title}" dihapus dari antrian.`);
  }
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
