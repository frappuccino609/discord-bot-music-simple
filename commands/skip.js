module.exports = {
  name: 'skip',
  description: 'Melewati lagu yang sedang diputar',
  execute(message, serverQueue) {
    if (!message.member.voice.channel) {
      return message.channel.send('Anda perlu bergabung dengan saluran suara terlebih dahulu!');
    }

    if (!serverQueue) {
      return message.channel.send('Tidak ada lagu yang dapat dilewati!');
    }

    serverQueue.connection.dispatcher.end();
    message.channel.send('Melewati lagu saat ini!');
  },
};