📺 SEEme OTT Streamer (React Native - Expo)
A lightweight offline streaming app built using React Native and Expo Router. This project demonstrates core OTT features like HLS video playback, offline saving, continue watching, and graceful handling of network/video failures — built as a developer assignment for SEEme.

⚙️ Setup Instructions

1. Clone the Repository
   bash
   Copy
   Edit
   git clone https://github.com/your-username/seeme-ott-starter.git
   cd seeme-ott-starter
2. Install Dependencies
   bash
   Copy
   Edit
   npm install

# or

yarn install 3. Start the Development Server
bash
Copy
Edit
npx expo start
Open in Expo Go (mobile) or an emulator (Android/iOS).

🧠 Assumptions
Videos are streamed using public .m3u8 HLS URLs.

Video downloads are stored in the app's sandbox using expo-file-system.

Playback should resume from the last position unless the video is >95% watched.

Fallback thumbnails and graceful error handling are acceptable alternatives to video previews.

Expo Router is used with the new file-based routing system.

The app targets modern mobile devices with adequate permissions and storage.

✅ Features Implemented
Feature Status
Landing screen with video cards ✅ Complete
Fullscreen video player (remote/local) ✅ Complete
Continue Watching section ✅ Complete
Download videos to local storage ✅ Complete
Resume playback from last watched time ✅ Complete
Graceful handling of broken video URLs ✅ Complete
Fallback image for failed thumbnails ✅ Complete
“Downloaded” tag after download success ✅ Complete

❌ Features Skipped or Optional
Feature Status Notes
Animated screen transitions ❌ Skipped Could be added via react-native-reanimated
Visual “Watched” tag after 95% view ⚠️ Partial Logic handled; no badge shown yet
Delete downloaded videos ❌ Skipped Can be implemented via long-press/delete
Video thumbnail extracted from video ❌ Skipped Placeholder thumbnails used instead
Persistent app state across reinstalls ❌ Skipped No file backup/restore support implemented

📦 Tech Stack
React Native

Expo SDK (with Router)

expo-av

expo-file-system

AsyncStorage

📁 File Overview
bash
Copy
Edit
app/
├── index.tsx # Landing screen
├── player.tsx # Fullscreen video player

src/
├── constants/
│ └── videos.ts # Video metadata
├── services/
│ ├── download.ts # Download logic
│ └── storage.ts # Watched progress handling
└── types/
└── video.ts # Type definitions


🧪 Testing Scenarios
✅ Play a video and seek → exit → re-enter → resumes from last timestamp

✅ Download a video → disable WiFi → confirm offline playback

✅ Click thumbnail with broken URL → fallback image displays

✅ Broken .m3u8 → video doesn't crash the app

✅ “Continue Watching” list appears for partially watched videos
