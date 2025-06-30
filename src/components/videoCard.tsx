import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { VideoItem } from "../types/video";

interface VideoCardProps {
  video: VideoItem;
  isWatched: boolean;
  isDownloaded: boolean;
  onPress: () => void;
  onDownload: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isWatched,
  isDownloaded,
  onPress,
  onDownload,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        resizeMethod="resize"
        source={{ uri: video.thumbnail }}
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.duration}>{video.duration}</Text>
        {isWatched && <Text style={styles.watchedText}>✅ Watched</Text>}
        <TouchableOpacity onPress={onDownload} style={styles.downloadButton}>
          <Text style={styles.downloadText}>
            {isDownloaded ? "Downloaded" : "Download"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  thumbnail: {
    height: 180,
    width: "100%",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  duration: {
    color: "gray",
  },
  watchedText: {
    color: "green",
    fontWeight: "bold",
    marginTop: 4,
  },
  downloadButton: {
    marginTop: 8,
  },
  downloadText: {
    color: "blue",
  },
});
