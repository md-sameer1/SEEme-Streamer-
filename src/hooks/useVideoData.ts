import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { VIDEO_LIST } from "../constants/videos";
import { getDownloadedPath } from "../services/download";
import { getVideoProgress } from "../services/storage";
import { VideoItem } from "../types/video";

type ListItem = VideoItem | { type: "section"; title: string };

export const useVideoData = () => {
  const [downloads, setDownloads] = useState<{ [key: string]: string }>({});
  const [listData, setListData] = useState<ListItem[]>([]);
  const [watchedMap, setWatchedMap] = useState<{ [key: string]: boolean }>({});

  const fetchDownloadsAndProgress = useCallback(async () => {
    const updated: { [key: string]: string } = {};
    const watchedMapTemp: { [key: string]: boolean } = {};
    const inProgress: VideoItem[] = [];

    await Promise.all(
      VIDEO_LIST.map(async (video: VideoItem) => {
        const [path, watchedSeconds] = await Promise.all([
          getDownloadedPath(video.id),
          getVideoProgress(video.id),
        ]);

        if (path) updated[video.id] = path;

        if (typeof watchedSeconds === "number") {
          const progressRatio: number = watchedSeconds / video.duration;

          if (progressRatio < 0.95) {
            inProgress.push(video);
          } else {
            watchedMapTemp[video.id] = true;
          }
        }
      })
    );

    setDownloads(updated);
    setWatchedMap(watchedMapTemp);

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

  return {
    downloads,
    setDownloads,
    listData,
    watchedMap,
    refetch: fetchDownloadsAndProgress,
  };
};
