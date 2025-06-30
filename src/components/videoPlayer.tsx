import { ResizeMode, Video } from "expo-av";
import React from "react";
import { Dimensions, StyleSheet, View, ViewStyle } from "react-native";
import { UseVideoPlayerReturn } from "../hooks/useVideoPlayer";

export interface VideoPlayerProps extends UseVideoPlayerReturn {
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  width?: number;
  height?: number;
  resizeMode?: ResizeMode;
  shouldPlay?: boolean;
  isMuted?: boolean;
  useNativeControls?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoRef,
  videoUri,
  handleLoad,
  handlePlaybackStatusUpdate,
  handleError,
  style,
  containerStyle,
  width = Dimensions.get("window").width,
  height = Dimensions.get("window").height * 0.4,
  resizeMode = ResizeMode.CONTAIN,
  shouldPlay = true,
  isMuted = false,
  useNativeControls = true,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        style={[styles.video, { width, height }, style]}
        useNativeControls={useNativeControls}
        resizeMode={resizeMode}
        shouldPlay={shouldPlay}
        isMuted={isMuted}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onLoad={handleLoad}
        onError={(e: any) => handleError(e.error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    backgroundColor: "#000",
  },
});
