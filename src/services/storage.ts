import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "video_progress_";

export const setVideoProgress = async (id: string, time: number) => {
  await AsyncStorage.setItem(PREFIX + id, time.toString());
};

export const getVideoProgress = async (id: string): Promise<number | null> => {
  const val = await AsyncStorage.getItem(PREFIX + id);
  return val ? parseFloat(val) : null;
};
