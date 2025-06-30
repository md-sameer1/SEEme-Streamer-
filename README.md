# 🎥 SEEme OTT Streamer (React Native + Expo)

A mini OTT streaming app built with **React Native** using **Expo Router**, designed for video playback, offline viewing, and progress tracking. Developed as part of a developer assignment for **SEEme**.

---

## ✨ Features

✅ Landing screen with video list  
✅ Fullscreen video playback with native controls  
✅ Resume from last watched time (Continue Watching)  
✅ Offline downloads and local playbook  
✅ Fallback for broken video URLs & thumbnails  
✅ Simple, modular file structure

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/seeme-ott-starter.git
cd seeme-ott-starter
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the app

```bash
npx expo start
```

### 4. Run on device

- Scan the QR code with **Expo Go** on your device
- Or run on an Android/iOS simulator

---

## 📁 Project Structure

```
seeme-ott-starter/
├── app/
│   ├── index.tsx          # Landing screen (video list)
│   └── player.tsx         # Fullscreen video player
├── src/
│   ├── constants/
│   │   └── videos.ts      # Predefined video data
│   ├── services/
│   │   ├── download.ts    # Video download logic
│   │   └── storage.ts     # Save/retrieve watch progress
│   └── types/
│       └── video.ts       # Video type definitions
├── package.json
└── README.md
```

---

## 🧠 Key Assumptions

- HLS `.m3u8` streams are always publicly accessible
- Downloaded videos are stored locally with no expiry
- Duration values are in seconds for easier calculations
- User cannot delete downloaded videos (feature not required)
- Offline playbook is verified manually (e.g., airplane mode testing)

---

## ✅ Features Implemented

| Feature                                 | Status      |
| --------------------------------------- | ----------- |
| Landing screen with 5 video cards       | ✅ Complete |
| Fullscreen video player                 | ✅ Complete |
| Continue watching logic                 | ✅ Complete |
| Download video for offline playback     | ✅ Complete |
| Resume playback from saved position     | ✅ Complete |
| Graceful error handling (video & image) | ✅ Complete |
| Download status label                   | ✅ Complete |

---

## ❌ Features Skipped / Optional

| Feature                               | Reason / Status                  |
| ------------------------------------- | -------------------------------- |
| Animated screen transitions           | Not essential for core features  |
| Visual tag for 95% watched            | Logic exists, UI not implemented |
| Video thumbnails extracted from video | Used placeholders for simplicity |
| Delete downloaded video               | Out of scope                     |
| Offline-only filter                   | Not required                     |

---

## 📺 Sample Videos

The app includes the following test videos:

- **Big Buck Bunny** - Classic open-source animation
- **Sintel** - Blender Foundation short film
- **Tears of Steel** - Sci-fi short film
- **Wildlife** - Nature documentary footage

_All videos are in `.m3u8` format for HLS streaming._

---

## 🧪 Testing Guidelines

### Offline Functionality

1. Download a video from the app
2. Switch device to airplane mode
3. Try playing the downloaded video → should work offline

### Continue Watching

1. Play any video and seek forward
2. Exit the player before completion
3. Return to video → should resume from last position

### Error Handling

1. Break a thumbnail URL in the code
2. Reload app → fallback image should appear

### Download Status

1. Tap "Download" button on any video
2. Status label should update to "Downloaded"

---

## 🛠️ Technologies Used

- **React Native** with Expo SDK
- **Expo Router** for navigation
- **Expo AV** for video playback
- **Expo FileSystem** for downloads
- **AsyncStorage** for progress tracking

---

## 🚀 Future Enhancements

- User authentication and profiles
- Video search and filtering
- Social features (ratings, comments)
- Advanced video quality selection
- Chromecast support
- Video analytics and recommendations

---

## 👨‍💻 Author

**Md Sameer**  
Frontend Developer & Software Engineer  
🔗 [GitHub Profile](https://github.com/md-sameer1)

---

## 📄 License

This project is developed as part of a coding assignment for SEEme and is intended for demonstration purposes.

---

_Built with ❤️ using React Native & Expo_
