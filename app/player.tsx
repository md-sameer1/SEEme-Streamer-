import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { getDownloadedPath } from "../src/services/download";
import { getVideoProgress, setVideoProgress } from "../src/services/storage";
import { VideoItem } from "../src/types/video";

export default function PlayerScreen() {
  const { video } = useLocalSearchParams<{ video: string }>();
  const parsedVideo: VideoItem = JSON.parse(video);
  const videoRef = useRef<Video>(null);
  const [uri, setUri] = useState(parsedVideo.url);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const localPath = await getDownloadedPath(parsedVideo.id);
      if (localPath) setUri(localPath);
    })();
  }, []);

  const handleLoad = async () => {
    const savedTime = await getVideoProgress(parsedVideo.id);
    if (savedTime && videoRef.current) {
      await videoRef.current.setStatusAsync({
        positionMillis: savedTime * 1000,
        shouldPlay: true,
      });
    }
  };

  const handlePlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    const currentStatus = status as AVPlaybackStatusSuccess;
    const seconds = currentStatus.positionMillis / 1000;

    if (seconds && seconds > 5) {
      await setVideoProgress(parsedVideo.id, seconds);
    }

    if (currentStatus.didJustFinish) {
      await setVideoProgress(parsedVideo.id, parsedVideo.duration as any);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isMuted={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onLoad={handleLoad}
        onError={(e) => {
          console.warn("Video failed to load:", e);
          Alert.alert("Playback Error", "This video couldn't be played.");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.4,
  },
});
