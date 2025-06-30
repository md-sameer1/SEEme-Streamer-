import { VideoItem } from "./video";

export type RootStackParamList = {
  Landing: undefined;
  Player: { video: VideoItem };
};
