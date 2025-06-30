import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { VideoItem } from "../types/video";
import { SectionHeader } from "./sectionHeader";
import { VideoCard } from "./videoCard";

type ListItem = VideoItem | { type: "section"; title: string };

interface VideoListProps {
  data: ListItem[];
  downloads: { [key: string]: string };
  watchedMap: { [key: string]: boolean };
  onDownload: (video: VideoItem) => void;
}

export const VideoList: React.FC<VideoListProps> = ({
  data,
  downloads,
  watchedMap,
  onDownload,
}) => {
  const router = useRouter();

  const navigateToPlayer = (video: VideoItem) => {
    router.push({
      pathname: "/Player",
      params: { video: JSON.stringify(video) },
    });
  };

  const renderItem = ({ item }: { item: ListItem }) => {
    if ("type" in item && item.type === "section") {
      return <SectionHeader title={item.title} />;
    }

    const video = item as VideoItem;
    return (
      <VideoCard
        video={video}
        isWatched={!!watchedMap[video.id]}
        isDownloaded={!!downloads[video.id]}
        onPress={() => navigateToPlayer(video)}
        onDownload={() => onDownload(video)}
      />
    );
  };

  const keyExtractor = (item: ListItem, index: number) =>
    "type" in item ? `section-${item.title}-${index}` : item.id;

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
