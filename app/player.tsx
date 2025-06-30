import { VideoPlayer } from "@/src/components/videoPlayer";
import { useVideoPlayer } from "@/src/hooks/useVideoPlayer";
import { VideoItem } from "@/src/types/video";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PlayerScreen() {
  const { video } = useLocalSearchParams<{ video: string }>();
  const parsedVideo: VideoItem = JSON.parse(video);

  const videoPlayerProps = useVideoPlayer({
    videoItem: parsedVideo,
    autoSaveProgressThreshold: 5,
  });

  return (
    <View style={styles.container}>
      <VideoPlayer {...videoPlayerProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
