# 🎥 SEEme OTT Streamer (React Native + Expo)

A mini OTT streaming app built with **React Native** using **Expo Router**, designed for video playback, offline viewing, and progress tracking. Developed as part of a developer assignment for **SEEme**.

---

## ✨ Features

✅ Landing screen with video list  
✅ Fullscreen video playback with native controls  
✅ Resume from last watched time (Continue Watching)  
✅ Offline downloads and local playback  
✅ Fallback for broken video URLs & thumbnails  
✅ Simple, modular file structure

---

## 🚀 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/your-username/seeme-ott-starter.git
cd seeme-ott-starter
Install dependencies
```

```bash
Copy
Edit
npm install
```

# or

yarn
Start the app

```bash
Copy
Edit
npx expo start
Scan the QR code with Expo Go on your device

Or run on an Android/iOS simulator
```

📁 Project Structure
css
Copy
Edit
seeme-ott-starter/
├── app/
│ ├── index.tsx # Landing screen (video list)
│ └── player.tsx # Fullscreen video player
├── src/
│ ├── constants/
│ │ └── videos.ts # Predefined video data
│ ├── services/
│ │ ├── download.ts # Video download logic
│ │ └── storage.ts # Save/retrieve watch progress
│ └── types/
│ └── video.ts # Video type definitions
🧠 Assumptions
HLS .m3u8 streams are always public

Downloaded videos are stored locally with no expiry

Duration values are in seconds for easier math

User can’t delete downloaded videos (not required)

Offline playback is verified manually (e.g., airplane mode)

✅ Features Implemented
Feature Status
Landing screen with 5 video cards ✅ Complete
Fullscreen video player ✅ Complete
Continue watching logic ✅ Complete
Download video for offline playback ✅ Complete
Resume playback from saved position ✅ Complete
Graceful error handling (video & image) ✅ Complete
Download status label ✅ Complete

❌ Features Skipped / Optional
Feature Reason / Status
Animated screen transitions Not essential for core features
Visual tag for 95% watched Logic exists, UI not shown
Video thumbnails extracted from video Used placeholders for simplicity
Delete downloaded video Out of scope
Offline-only filter Not required

📺 Sample Videos
Big Buck Bunny

Sintel

Tears of Steel

Wildlife

All videos are .m3u8 format for HLS playback.

🧪 Testing Tips
Download a video, switch to airplane mode → try playback

Play a video, seek forward, exit → check “Continue Watching”

Break a thumbnail URL → fallback image appears

Tap “Download” → status label updates to “Downloaded”

👨‍💻 Author
Md Sameer
Frontend Developer & Software Engineer in Progress
🔗 GitHub
