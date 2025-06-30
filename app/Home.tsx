import { VideoList } from "@/src/components/videoList";
import { useVideoData } from "@/src/hooks/useVideoData";
import { useVideoDownload } from "@/src/hooks/useVideoDownload";
import React from "react";

export default function LandingScreen() {
  const { downloads, setDownloads, listData, watchedMap } = useVideoData();
  const { handleDownload } = useVideoDownload(setDownloads);

  return (
    <VideoList
      data={listData}
      downloads={downloads}
      watchedMap={watchedMap}
      onDownload={handleDownload}
    />
  );
}
