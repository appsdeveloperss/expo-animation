import React, { useState } from "react";
import { View, Text, Pressable, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Gradient2 from "@/components/gradient-02";

export default function App() {
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  return (
    <View className="flex-1 bg-[#090A0D]">
      <StatusBar barStyle="light-content" />

      {/* 1. Animated fluid gradient positioned at the bottom of the screen */}
      <Gradient2 />

      {/* 2. Top-level UI layer overlay */}
      <SafeAreaView className="flex-1 justify-between px-6 py-4">
        {/* Header Controls */}
        <View className="flex-row items-center justify-between">
          <Pressable
            className="w-12 h-12 items-center justify-center rounded-full bg-white/5 border border-white/5 active:scale-95 active:bg-white/10 transition-all duration-200"
            onPress={() => console.log("Close pressed")}
          >
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </Pressable>

          <Pressable
            className="w-12 h-12 items-center justify-center rounded-full bg-white/5 border border-white/5 active:scale-95 active:bg-white/10 transition-all duration-200"
            onPress={() => setIsVideoMuted(!isVideoMuted)}
          >
            <Ionicons
              name={isVideoMuted ? "videocam-off-outline" : "videocam-outline"}
              size={24}
              color="#FFFFFF"
            />
          </Pressable>
        </View>

        {/* Middle Atmospheric Area (empty to emphasize the glowing wave) */}
        <View className="flex-1 items-center justify-center" />

        {/* Bottom Actions */}
        <View className="items-center pb-8">
          <Pressable
            className="px-10 py-4 bg-neutral-900/80 border border-white/10 rounded-full shadow-2xl shadow-black/50 active:scale-95 active:bg-neutral-800/90 transition-all duration-150"
            style={{ minWidth: 140 }}
            onPress={() => console.log("Skip pressed")}
          >
            <Text className="text-white text-base font-semibold text-center tracking-wide">
              Skip
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
