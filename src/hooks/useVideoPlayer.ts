import { AVPlaybackStatus, AVPlaybackStatusSuccess, Video } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { getDownloadedPath } from "../services/download";
import { getVideoProgress, setVideoProgress } from "../services/storage";
import { VideoItem } from "../types/video";

export interface UseVideoPlayerProps {
  videoItem: VideoItem;
  autoSaveProgressThreshold?: number;
}

export interface UseVideoPlayerReturn {
  videoRef: React.RefObject<Video | null>;
  videoUri: string;
  handleLoad: () => Promise<void>;
  handlePlaybackStatusUpdate: (status: AVPlaybackStatus) => Promise<void>;
  handleError: (error: string) => void;
}

export const useVideoPlayer = ({
  videoItem,
  autoSaveProgressThreshold = 5,
}: UseVideoPlayerProps): UseVideoPlayerReturn => {
  const videoRef = useRef<Video>(null);
  const [videoUri, setVideoUri] = useState(videoItem.url);

  useEffect(() => {
    const loadLocalVideo = async () => {
      try {
        const localPath = await getDownloadedPath(videoItem.id);
        if (localPath) {
          setVideoUri(localPath);
        }
      } catch (error) {
        console.warn("Failed to load local video:", error);
      }
    };

    loadLocalVideo();
  }, [videoItem.id]);

  const handleLoad = async () => {
    try {
      const savedTime = await getVideoProgress(videoItem.id);
      if (savedTime && videoRef.current) {
        await videoRef.current.setStatusAsync({
          positionMillis: savedTime * 1000,
          shouldPlay: true,
        });
      }
    } catch (error) {
      console.warn("Failed to load video progress:", error);
    }
  };

  const handlePlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    try {
      const currentStatus = status as AVPlaybackStatusSuccess;
      const seconds = currentStatus.positionMillis / 1000;

      if (seconds && seconds > autoSaveProgressThreshold) {
        await setVideoProgress(videoItem.id, seconds);
      }

      if (currentStatus.didJustFinish) {
        await setVideoProgress(videoItem.id, videoItem.duration as number);
      }
    } catch (error) {
      console.warn("Failed to update video progress:", error);
    }
  };

  const handleError = (error: string) => {
    console.warn("Video failed to load:", error);
    Alert.alert("Playback Error", "This video couldn't be played.");
  };

  return {
    videoRef,
    videoUri,
    handleLoad,
    handlePlaybackStatusUpdate,
    handleError,
  };
};
