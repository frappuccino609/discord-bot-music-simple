module.exports = {
  name: 'stop',
  description: 'Menghentikan pemutaran lagu dan membersihkan antrian',
  execute(message, serverQueue) {
    if (!message.member.voice.channel) {
      return message.channel.send('Anda perlu bergabung dengan saluran suara terlebih dahulu!');
    }

    if (!serverQueue) {
      return message.channel.send('Tidak ada lagu yang dapat dihentikan!');
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    message.channel.send('Pemutaran lagu dihentikan dan antrian dibersihkan!');
  },
};