import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { VIDEO_LIST } from "../src/constants/videos";
import { downloadVideo, getDownloadedPath } from "../src/services/download";
import { getVideoProgress } from "../src/services/storage";
import { VideoItem } from "../src/types/video";

type ListItem = VideoItem | { type: "section"; title: string };

export default function LandingScreen() {
  const router = useRouter();
  const [downloads, setDownloads] = useState<{ [key: string]: string }>({});
  const [listData, setListData] = useState<ListItem[]>([]);

  const fetchDownloadsAndProgress = useCallback(async () => {
    const updated: { [key: string]: string } = {};
    const inProgress: VideoItem[] = [];

    await Promise.all(
      VIDEO_LIST.map(async (video) => {
        const [path, watched] = await Promise.all([
          getDownloadedPath(video.id),
          getVideoProgress(video.id),
        ]);

        if (path) updated[video.id] = path;
        if (watched && (((watched as any) < video.duration) as any) * 0.95)
          inProgress.push(video);
      })
    );

    setDownloads(updated);

    const combined: ListItem[] = [];
    if (inProgress.length > 0) {
      combined.push(
        { type: "section", title: "Continue Watching" },
        ...inProgress
      );
    }
    combined.push({ type: "section", title: "All Videos" }, ...VIDEO_LIST);
    setListData(combined);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDownloadsAndProgress();
    }, [fetchDownloadsAndProgress])
  );

  const handleDownload = async (video: VideoItem) => {
    try {
      const path = await downloadVideo(video.id, video.url);
      Alert.alert("Download Complete", `Saved to ${path}`);
      setDownloads((prev) => ({ ...prev, [video.id]: path }));
    } catch (e: any) {
      Alert.alert("Download Failed", e.message);
    }
  };

  const renderItem = ({ item }: any) => {
    if ("type" in item && item.type === "section") {
      return (
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 12 }}>
          {item.title}
        </Text>
      );
    }

    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/player",
            params: { video: JSON.stringify(item) },
          })
        }
        style={{
          marginBottom: 16,
          backgroundColor: "#fff",
          borderRadius: 10,
          overflow: "hidden",
          elevation: 2,
        }}>
        <Image
          resizeMethod="resize"
          source={{ uri: item.thumbnail }}
          style={{ height: 180, width: "100%" }}
        />
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
          <Text style={{ color: "gray" }}>{item.duration}</Text>
          <TouchableOpacity
            onPress={() => handleDownload(item)}
            style={{ marginTop: 8 }}>
            <Text style={{ color: "blue" }}>
              {downloads[item.id] ? "Downloaded" : "Download"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={listData}
      keyExtractor={(item, index) =>
        "type" in item ? `section-${item.title}-${index}` : item.id
      }
      contentContainerStyle={{ padding: 16 }}
      renderItem={renderItem}
    />
  );
}
