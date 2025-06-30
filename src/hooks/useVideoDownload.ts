import { Alert } from "react-native";
import { downloadVideo } from "../services/download";
import { VideoItem } from "../types/video";

export const useVideoDownload = (
  setDownloads: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
) => {
  const handleDownload = async (video: VideoItem) => {
    try {
      const path = await downloadVideo(video.id, video.url);
      Alert.alert("Download Complete", `Saved to ${path}`);
      setDownloads((prev) => ({ ...prev, [video.id]: path }));
    } catch (e: any) {
      Alert.alert("Download Failed", e.message);
    }
  };

  return { handleDownload };
};
