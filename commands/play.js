const ytdl = require('ytdl-core');
const { play } = require('../util/queue');

module.exports = {
  name: 'play',
  description: 'Memainkan musik dari YouTube',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.channel.send('Anda harus bergabung dengan saluran suara terlebih dahulu!');
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send('Bot memerlukan izin untuk bergabung dan berbicara di saluran suara!');
    }

    const songInfo = await ytdl.getInfo(args[0]);
    const song = {
      title: songInfo.title,
      url: songInfo.video_url,
    };

    play(message.guild, song);
  },
};