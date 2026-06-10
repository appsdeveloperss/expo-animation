import { Blur, Canvas, Circle, Group } from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function Gradient2() {
  const { width, height } = useWindowDimensions();

  // Unified running clock for the animation phases
  const time = useSharedValue(0);

  useEffect(() => {
    // Continuous loop for smooth organic movement
    time.value = withRepeat(
      withTiming(2 * Math.PI * 10, {
        duration: 15000,
        easing: Easing.linear,
      }),
      -1, // Infinitely repeat
      false, // Do not reverse, keep progressing forward
    );
  }, [time]);

  // Circle 1: Bright Cyan (Left-Center)
  const c1cx = useDerivedValue(() => {
    return width * 0.25 + Math.sin(time.value * 0.9) * 45;
  });
  const c1cy = useDerivedValue(() => {
    return height - 90 + Math.cos(time.value * 0.7) * 25;
  });
  const c1r = useDerivedValue(() => {
    return width * 0.35 + Math.sin(time.value * 0.5) * 15;
  });

  // Circle 2: Electric Blue (Right-Center)
  const c2cx = useDerivedValue(() => {
    return width * 0.75 + Math.cos(time.value * 0.8) * 55;
  });
  const c2cy = useDerivedValue(() => {
    return height - 100 + Math.sin(time.value * 0.9) * 20;
  });
  const c2r = useDerivedValue(() => {
    return width * 0.38 + Math.cos(time.value * 0.6) * 20;
  });

  // Circle 3: Indigo/Purple (Center-Deep)
  const c3cx = useDerivedValue(() => {
    return width * 0.5 + Math.sin(time.value * 0.6) * 40;
  });
  const c3cy = useDerivedValue(() => {
    return height - 130 + Math.cos(time.value * 1.1) * 30;
  });
  const c3r = useDerivedValue(() => {
    return width * 0.42 + Math.sin(time.value * 0.7) * 25;
  });

  // Circle 4: Teal/Green-Cyan (Lower anchor)
  const c4cx = useDerivedValue(() => {
    return width * 0.4 + Math.cos(time.value * 1.0) * 50;
  });
  const c4cy = useDerivedValue(() => {
    return height - 60 + Math.sin(time.value * 0.8) * 15;
  });
  const c4r = useDerivedValue(() => {
    return width * 0.32 + Math.cos(time.value * 0.5) * 15;
  });

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Group>
        {/* Heavy blur filter to merge and diffuse the circles into a single fluid glow */}
        <Blur blur={100} mode="decal" />

        {/* Circle 4 (Teal base layer) */}
        <Circle cx={c4cx} cy={c4cy} r={c4r} color="#0d9488" />

        {/* Circle 1 (Cyan bright spot) */}
        <Circle cx={c1cx} cy={c1cy} r={c1r} color="#22d3ee" />

        {/* Circle 3 (Indigo deep spot) */}
        <Circle cx={c3cx} cy={c3cy} r={c3r} color="#6366f1" />

        {/* Circle 2 (Blue bright spot) */}
        <Circle cx={c2cx} cy={c2cy} r={c2r} color="#3b82f6" />
      </Group>
    </Canvas>
  );
}
