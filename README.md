# discord-bot-music-simple

A simple music bot using Discord.js to play songs from YouTube.
using ytdl-core

## Features

- Play songs from YouTube
- Adjust volume, skip songs, and stop playback
- Song playback queue

## Installation

1. **Install dependencies:**
    ```bash
    npm install discord.js ytdl-core
    ```

2. **Configure the bot:**
   - Replace the value `YOUR_BOT_TOKEN` with your Discord bot token in `config.json`.

3. **Run the bot:**
    ```bash
    node index.js
    ```

## Usage

1. Invite the bot to your Discord server.
2. Join a voice channel on the server.
3. Use the command `!play [YOUTUBE_URL]` to play a song from YouTube.
4. Use other commands like `!skip` and `!stop` as needed.

## Bot Commands

- `!play [YOUTUBE_URL]`: Play a song from YouTube.
- `!skip`: Skip the currently playing song.
- `!stop`: Stop playback and leave the voice channel.

## Notes

- This bot is developed following Discord's guidelines and rules. Make sure to understand and comply with those rules.
- Ensure you have the appropriate permissions and copyrights to play audio/video content.

## Contribution

If you want to contribute to this project, please create a pull request and report any issues you encounter.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for more details.
