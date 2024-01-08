# discord-bot-music-simple

Bot musik sederhana menggunakan Discord.js untuk memainkan lagu dari YouTube.

## Fitur

- Memainkan lagu dari YouTube
- Mengatur volume, melewatkan lagu, dan menghentikan pemutaran
- Antrian pemutaran lagu

## Instalasi

1. Instal dependencies:

   ```bash
   npm install discord.js ytdl-core
Konfigurasi bot:

Salin config.example.json ke config.json:

bash
Copy code
cp config.example.json config.json
Ganti nilai YOUR_BOT_TOKEN dengan token bot Discord Anda dalam config.json.

Jalankan bot:

bash
Copy code
node index.js
Penggunaan
Undang bot ke server Discord Anda.

Bergabunglah dengan saluran suara di server.

Gunakan perintah !play [URL_YOUTUBE] untuk memainkan lagu dari YouTube.

Gunakan perintah lain seperti !skip dan !stop sesuai kebutuhan.

Perintah Bot
!play [URL_YOUTUBE]: Memainkan lagu dari YouTube.
!skip: Melewati lagu yang sedang diputar.
!stop: Menghentikan pemutaran dan keluar dari saluran suara.
Catatan
Bot ini dikembangkan dengan mengikuti panduan dan aturan Discord. Pastikan untuk memahami dan mematuhi aturan tersebut.
Pastikan Anda memiliki izin dan hak cipta yang sesuai untuk memainkan konten audio/video.
Kontribusi
Jika Anda ingin berkontribusi pada proyek ini, silakan buat pull request dan laporkan issue jika Anda menemui masalah.

Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT - lihat LICENSE.md untuk detail lebih lanjut.
