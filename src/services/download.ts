import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const DIR = FileSystem.documentDirectory + "videos/";

export const downloadVideo = async (
  id: string,
  url: string
): Promise<string> => {
  const downloadPath = `${FileSystem.documentDirectory}${id}.mp4`;

  const { uri } = await FileSystem.downloadAsync(url, downloadPath);
  await AsyncStorage.setItem(`video_download_${id}`, uri);

  return uri;
};

export const getDownloadedPath = async (id: string): Promise<string | null> => {
  const path = DIR + id + ".mp4";
  const info = await FileSystem.getInfoAsync(path);
  return info.exists ? path : null;
};
