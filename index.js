// index.js
const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
const prefix = '!'; // Ganti dengan prefix bot Anda
const queue = new Map();

// Baca informasi dari config.json
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const token = config.token;
const youtubeAPIKey = config.youtubeAPIKey;

const youtube = google.youtube({
  version: 'v3',
  auth: youtubeAPIKey,
});

// Memuat semua perintah dari folder commands
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

// Memuat kelas Queue
const Queue = require('./util/queue');
const serverQueue = new Queue();

bot.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (bot.commands.has(command)) {
    try {
      bot.commands.get(command).execute(message, serverQueue);
    } catch (error) {
      console.error(error);
      message.reply('Terjadi kesalahan saat menjalankan perintah!');
    }
  }
});

bot.login(token); // Menggunakan token dari config.json
